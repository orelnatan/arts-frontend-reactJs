import { useTranslation } from 'react-i18next'
import { TextInput, type TextInputProps } from '@mantine/core'

interface InputTextProps extends Omit<TextInputProps, 'onChange'> {
  namespace?: string
  keyPrefix?: string
  onChange?: (value: string) => void
}

export default function InputText({
  namespace,
  keyPrefix,
  onChange,
  ...props
}: InputTextProps) {
  const { t } = useTranslation(namespace, { keyPrefix })

  return (
    <TextInput
      {...props}
      placeholder={t(props.placeholder ?? '')}
      error={typeof props.error === 'string' ? t(props.error) : null}
      onChange={(event) => {
        onChange?.(event.currentTarget.value)
      }}
    />
  )
}
