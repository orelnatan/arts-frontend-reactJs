import type { ReactNode } from 'react';
import { Drawer, type DrawerProps, type MantineTransition } from '@mantine/core';

import { useDirectionContext } from '@arts/core';

enum Direction {
  LTR = "ltr",
  RTL = "rtl"
}

type NonNullableDrawerPosition = NonNullable<DrawerProps['position']>;

const DIRECTION_TO_POSITION: Record<Direction, NonNullableDrawerPosition> = {
  [Direction.LTR]: 'right',
  [Direction.RTL]: 'left'
}

const POSITION_TO_TRANSITION: Record<NonNullableDrawerPosition, MantineTransition> = {
  left: 'slide-right',    
  right: 'slide-left', 
  top: 'slide-down',
  bottom: 'slide-up',
};

interface SideDrawerProps extends Omit<DrawerProps, 'position'> {
  withHeader?: boolean;
  children: ReactNode;
}

export default function SideDrawer({ 
  withHeader = false,
  children, 
  ...rest 
}: SideDrawerProps) {  
  const { direction } = useDirectionContext();

  return (
    <Drawer
      position="right"
      transitionProps={{
        transition: POSITION_TO_TRANSITION[DIRECTION_TO_POSITION[direction]],
        duration: 300,
      }}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      styles={{
        body: {
          height: withHeader ? 'calc(var(--full-host-height) - 60px)' : 'var(--full-host-height)',
        },
        header: {
          display: withHeader ? 'static' : 'none'
        },
      }}
      {...rest} 
    >
      {children}
    </Drawer>
  );
}