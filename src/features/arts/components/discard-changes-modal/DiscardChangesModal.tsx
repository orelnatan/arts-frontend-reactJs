import { AppModal, Caption } from '@arts/shared/components'
import { PrimaryButton } from '@arts/libs/form-utils'

import './DiscardChangesModal.scss'

interface DiscardChangesModalProps {
  opened: boolean
  keepEditing: () => void
  discardAndLeave: () => void
  cancel: () => void
}

export default function DiscardChangesModal({
  opened,
  keepEditing,
  discardAndLeave,
  cancel,
}: DiscardChangesModalProps) {
  return (
    <AppModal
      opened={opened}
      onClose={cancel}
      title={
        <Caption namespace="arts" keyPrefix="discard-changes-modal">
          title
        </Caption>
      }
    >
      <div className="discard-changes-modal-main">
        <div className="discard-changes-modal-caption">
          <span className="assistant-regular">
            <Caption namespace="arts" keyPrefix="discard-changes-modal">
              note
            </Caption>
          </span>
        </div>

        <div className="discard-changes-modal-controls">
          <PrimaryButton
            namespace="arts"
            keyPrefix="discard-changes-modal"
            label="keep-editing"
            onClick={keepEditing}
          />

          <PrimaryButton
            namespace="arts"
            keyPrefix="discard-changes-modal"
            label="leave-without-save"
            onClick={discardAndLeave}
          />
        </div>
      </div>
    </AppModal>
  )
}
