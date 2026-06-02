import type { ReactNode } from 'react';

import { Modal, type ModalProps } from '@mantine/core';

interface AppModalProps extends ModalProps {
  children: ReactNode;
}

export default function AppModal({ onClose, opened, title, children }: AppModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      {children}
    </Modal>
  );
}