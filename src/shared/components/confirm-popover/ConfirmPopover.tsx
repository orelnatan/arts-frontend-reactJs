import { useDisclosure } from '@mantine/hooks'
import { Popover, type PopoverProps } from '@mantine/core'
import type { ReactNode } from 'react'

import { PrimaryButton } from '@arts/libs/form-utils'

import { Caption } from '../caption'

import './ConfirmPopover.scss'

interface ConfirmPopoverProps extends Omit<
  PopoverProps,
  'opened' | 'onChange'
> {
  children: ReactNode
  onConfirm?: () => void
  onAbort?: () => void
}

export default function ConfirmPopover({
  children,
  onConfirm,
  onAbort,
  ...rest
}: ConfirmPopoverProps) {
  const [opened, { open, close }] = useDisclosure(false)

  const handleAbort = () => {
    close()
    onAbort?.()
  }

  const handleConfirm = () => {
    close()
    onConfirm?.()
  }

  return (
    <Popover
      position="bottom"
      shadow="md"
      withArrow
      width={235}
      opened={opened}
      onChange={close}
      {...rest}
    >
      <Popover.Target>
        <div className="confirm-popover-target" onClick={open}>
          {children}
        </div>
      </Popover.Target>

      <Popover.Dropdown>
        <div className="confirm-popover-content">
          <span className="assistant-bold">
            <Caption namespace="shared" keyPrefix="confirm-popover">
              are-you-sure
            </Caption>
          </span>

          <div className="popover-content-controls">
            <PrimaryButton
              namespace="shared"
              keyPrefix="confirm-popover"
              label="no"
              fullWidth
              justify="center"
              onClick={handleAbort}
            />

            <PrimaryButton
              namespace="shared"
              keyPrefix="confirm-popover"
              label="yes"
              justify="center"
              fullWidth
              onClick={handleConfirm}
            />
          </div>
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}
