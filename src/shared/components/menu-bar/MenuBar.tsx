import type { ReactNode } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { Menu, type FloatingPosition } from '@mantine/core';

import type { ListItem } from "@arts/shared/models";

import { Caption } from "../caption";

interface MenuBarProps<T = unknown> {
  children: ReactNode;
  items: ListItem<T>[];
  actives?: string[];
  position?: FloatingPosition;
  disabled?: boolean;
  width?: number;
  namespace?: string;
  keyPrefix?: string;
  onSelect?: (item: ListItem<T>) => void;
}

interface RenderMenuItemProps<T> {
  item: ListItem<T>;
  actives: string[];
  namespace?: string;
  keyPrefix?: string;
  onSelect?: (item: ListItem<T>) => void;
}

function RenderMenuItem<T>({ 
  item, 
  actives, 
  namespace, 
  keyPrefix, 
  onSelect 
}: RenderMenuItemProps<T>) {
  const navigate = useNavigate();
  const location = useLocation();

  if (item.hidden) return null;
  const isActive = (item: ListItem<T>): boolean => {
    const isValueMarkedAsActive = actives.includes(item.value as string);
    const isActiveFlagTruthy = !!item?.active;
    const isRoutePathActive = !!item.path && !!matchPath(
      { path: item.path, end: false }, location.pathname);

    return isValueMarkedAsActive || isActiveFlagTruthy || isRoutePathActive;
  };

  const isDisabled = (item: ListItem<T>): boolean => {
    const isValueMarkedAsActive = actives.includes(item.value as string);
    const isDisabledFlagTruthy = !!item?.disabled;

    return isValueMarkedAsActive || isDisabledFlagTruthy;
  };

  const handleItemClick = (item: ListItem<T>): void => {
    onSelect?.(item);

    if(item.path) navigate(item.path);
  };

  const hasChildren = item.children && item.children.length > 0;
  if (hasChildren) {
    return (
      <Menu.Sub openDelay={120} closeDelay={150}>
        <Menu.Sub.Target>
          <Menu.Sub.Item
            disabled={isDisabled(item)}
            leftSection={item.icon}
            rightSection={item.trailingIcon}
            className={`${item.class || ''} ${isActive(item) ? 'highlighted-item' : ''}`.trim()}
            onClick={() => handleItemClick(item)}
          >
            <Caption namespace={namespace} keyPrefix={keyPrefix}>
              {item.label}
            </Caption>
          </Menu.Sub.Item>
        </Menu.Sub.Target>
        
        <Menu.Sub.Dropdown>
          {item.children?.map((child) => (
            <RenderMenuItem 
              key={child.id} 
              item={child as ListItem<T>} 
              actives={actives}
              namespace={namespace}
              keyPrefix={keyPrefix}
              onSelect={onSelect}
            />
          ))}
        </Menu.Sub.Dropdown>
      </Menu.Sub>
    );
  }

  return (
    <Menu.Item
      disabled={isDisabled(item)}
      leftSection={item.icon}
      rightSection={item.trailingIcon}
      className={`${item.class || ''} ${isActive(item) ? 'highlighted-item' : ''}`.trim()}
      onClick={() => handleItemClick(item)}
    >
      <Caption namespace={namespace} keyPrefix={keyPrefix}>
        {item.label}
      </Caption>
    </Menu.Item>
  );
}

// 2. Your main MenuBar component is now lean and fast
export default function MenuBar<T>({ 
  children,
  items,
  actives = [],
  position = "bottom",
  disabled,
  width = 200,
  namespace,
  keyPrefix,
  onSelect
}: MenuBarProps<T>) {
  return (
    <div className="menu-bar-main">
      <Menu shadow="md" width={width} position={position} disabled={disabled}>
        <Menu.Target>
          <span>{children}</span>
        </Menu.Target>

        <Menu.Dropdown>
          {items.map((item) => (
            <RenderMenuItem 
              key={item.id} 
              item={item} 
              actives={actives}
              namespace={namespace}
              keyPrefix={keyPrefix}
              onSelect={onSelect}
            />
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}