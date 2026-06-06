import { AppModal, Caption } from '@arts/shared/components';
import { PrimaryButton } from '@arts/libs/form-utils';

import './LogoutModal.scss';

interface LogoutModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ opened, onClose, onConfirm }: LogoutModalProps) {
  return (
    <AppModal
      opened={opened}
      onClose={onClose}
      title={<Caption namespace='core' keyPrefix='logout-modal'>
        title</Caption>}
    >
      <div className='logout-modal-main'>
        <div className='logout-modal-caption'>
          <span className='assistant-regular'>
            <Caption namespace='core' keyPrefix='logout-modal'>
              note</Caption></span>
        </div>

        <div className='logout-modal-controls'>
          <PrimaryButton
            namespace='core'
            keyPrefix='logout-modal'
            label='yes-logout'
            onClick={onConfirm}
          />

          <PrimaryButton
            namespace='core'
            keyPrefix='logout-modal'
            label='no-stay'
            onClick={onClose}
          />
        </div>
      </div>
    </AppModal>
  );
}