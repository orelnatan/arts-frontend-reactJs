import { useTranslation } from 'react-i18next'
import { Button, type ButtonProps, type ButtonVariant } from '@mantine/core'

import { SvgIcon } from '@arts/shared/components'

import './PrimaryButton.scss'

interface PrimaryButtonProps extends ButtonProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  label?: string
  namespace?: string
  keyPrefix?: string
  loading?: boolean
  disabled?: boolean
  leftIcon?: string | null
  rightIcon?: string | null
  topCornerRadius?: boolean
  bottomCornerRadius?: boolean
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
  topCornerRadius,
  bottomCornerRadius,
  variant = 'filled',
  onClick,
  ...props
}: PrimaryButtonProps) {
  const { t } = useTranslation(namespace, { keyPrefix })

  return (
    <div
      className={`primary-button-main ${topCornerRadius ? 'top-corner-radius' : ''} ${bottomCornerRadius ? 'bottom-corner-radius' : ''}`}
    >
      <Button
        style={props.style}
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
