import type { ReactNode } from 'react'
import { Tooltip, type TooltipProps } from '@mantine/core'

interface AppTooltipProps extends Omit<
  TooltipProps,
  'withArrow' | 'multiline' | 'w'
> {
  children: ReactNode
  width?: number
}

export default function AppTooltip({
  children,
  width,
  ...rest
}: AppTooltipProps) {
  return (
    <Tooltip withArrow multiline w={width} {...rest}>
      {children}
    </Tooltip>
  )
}
