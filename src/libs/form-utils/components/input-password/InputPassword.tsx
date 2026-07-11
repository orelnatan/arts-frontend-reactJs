import { useTranslation } from 'react-i18next'
import { PasswordInput, type PasswordInputProps } from '@mantine/core'

interface InputPasswordProps extends Omit<
  PasswordInputProps,
  'onChange' | 'label'
> {
  namespace?: string
  keyPrefix?: string
  label?: string
  suppressErrorText?: boolean
  onChange?: (value: string) => void
}

export default function InputPassword({
  namespace,
  keyPrefix,
  label,
  onChange,
  suppressErrorText,
  ...props
}: InputPasswordProps) {
  const { t } = useTranslation(namespace, { keyPrefix })

  return (
    <PasswordInput
      {...props}
      label={label ? t(label) : ''}
      placeholder={props.placeholder ? t(props.placeholder) : ''}
      error={
        suppressErrorText && props.error
          ? !!props.error
          : typeof props.error === 'string'
            ? t(props.error)
            : null
      }
      onChange={(event) => {
        onChange?.(event.currentTarget.value)
      }}
    />
  )
}
