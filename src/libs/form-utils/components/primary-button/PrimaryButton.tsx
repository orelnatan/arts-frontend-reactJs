import { useTranslation } from 'react-i18next'
import { Button, type ButtonVariant } from '@mantine/core'

import './PrimaryButton.scss'
import { SvgIcon } from '@arts/shared/components'

interface PrimaryButtonProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  label?: string
  namespace?: string
  keyPrefix?: string
  loading?: boolean
  disabled?: boolean
  leftIcon?: string | null
  rightIcon?: string | null
  justify?: React.CSSProperties['justifyContent']
  variant?: ButtonVariant
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function PrimaryButton({
  type = 'submit',
  label,
  namespace,
  keyPrefix,
  loading,
  disabled,
  leftIcon = null,
  rightIcon = null,
  justify = 'space-between',
  variant = 'filled',
  onClick,
}: PrimaryButtonProps) {
  const { t } = useTranslation(namespace, { keyPrefix })

  return (
    <div className="primary-button-main">
      <Button
        variant={variant}
        loading={loading}
        disabled={disabled}
        leftSection={leftIcon ? <SvgIcon icon={leftIcon} /> : null}
        rightSection={rightIcon ? <SvgIcon icon={rightIcon} /> : null}
        justify={justify}
        type={type}
        onClick={onClick}
      >
        {t(label ?? '')}
      </Button>
    </div>
  )
}
