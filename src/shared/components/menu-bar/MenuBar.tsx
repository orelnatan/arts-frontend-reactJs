import type { ReactNode } from "react";
import { Menu, type FloatingPosition } from '@mantine/core';

import type { ListItem } from "@arts/shared/models";

import { Caption } from "../caption";

interface MenuBarProps<T = unknown> {
  children: ReactNode;
  items: ListItem<T>[];
  position?: FloatingPosition;
  width?: number;
  namespace?: string;
  keyPrefix?: string;
  onSelect?: (item: ListItem<T>) => void;
}

export default function MenuBar({ 
  children,
  items,
  position = "bottom",
  width = 200,
  namespace,
  keyPrefix,
  onSelect
}: MenuBarProps) {
  const RenderMenuItem = ({ item }: { item: ListItem }) => {
    if (item.hidden) return null;

    const hasChildren = item.children && item.children.length > 0;
    if (hasChildren) {
      return (
        <Menu.Sub openDelay={120} closeDelay={150}>
          <Menu.Sub.Target>
            <Menu.Sub.Item
              disabled={item.disabled}
              className={item.class}
              leftSection={item.icon}
              rightSection={item.trailingIcon}
            >
              <Caption namespace={namespace} keyPrefix={keyPrefix}>
                {item.label}
              </Caption>
            </Menu.Sub.Item>
          </Menu.Sub.Target>
          
          <Menu.Sub.Dropdown>
            {item.children?.map((child) => (
              <RenderMenuItem key={child.id} item={child} />
            ))}
          </Menu.Sub.Dropdown>
        </Menu.Sub>
      );
    }

    return (
      <Menu.Item
        disabled={item.disabled}
        leftSection={item.icon}
        rightSection={item.trailingIcon}
        className={item.class}
        onClick={() => onSelect?.(item)}
      >
        <Caption namespace={namespace} keyPrefix={keyPrefix}>
          {item.label}
        </Caption>
      </Menu.Item>
    );
  };

  return (
    <div className="menu-bar-main">
      <Menu shadow="md" width={width} position={position}>
        <Menu.Target>
          <span style={{ cursor: "pointer" }}>
            {children}
          </span>
        </Menu.Target>

        <Menu.Dropdown>
          {items.map((item) => (
            <RenderMenuItem key={item.id} item={item} />
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}