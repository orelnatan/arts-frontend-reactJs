import type { ReactNode } from 'react'

import { Modal, type ModalProps } from '@mantine/core'

interface AppModalProps extends ModalProps {
  children: ReactNode
}

export default function AppModal({
  children,
  onClose,
  ...rest
}: AppModalProps) {
  return (
    <Modal
      centered
      onClose={onClose}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      {...rest}
    >
      {children}
    </Modal>
  )
}
