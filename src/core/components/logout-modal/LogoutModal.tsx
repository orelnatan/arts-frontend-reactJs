import { AppModal } from '@arts/shared/components';
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
      title="Logout?"
    >
      <div className='logout-modal-main'>
        <div className='logout-modal-caption'>
          <span className='assistant-regular'>
            Are you sure you want to logout? You will need to sign back in to access your dashboard.</span>
        </div>

        <div className='logout-modal-controls'>
          <PrimaryButton
            label='Yes, log me out'
            onClick={onConfirm}
          />

          <PrimaryButton
            label='No, stay'
            onClick={onClose}
          />
        </div>
      </div>
    </AppModal>
  );
}