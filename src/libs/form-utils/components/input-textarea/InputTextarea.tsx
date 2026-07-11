import { useTranslation } from 'react-i18next'
import { Textarea, type TextareaProps } from '@mantine/core'

interface InputTextareaProps extends Omit<TextareaProps, 'onChange' | 'label'> {
  namespace?: string
  keyPrefix?: string
  label?: string
  onChange?: (value: string) => void
}

export default function InputTextarea({
  namespace,
  keyPrefix,
  label,
  onChange,
  ...props
}: InputTextareaProps) {
  const { t } = useTranslation(namespace, { keyPrefix })

  return (
    <Textarea
      {...props}
      label={label ? t(label) : ''}
      placeholder={props.placeholder ? t(props.placeholder) : ''}
      error={typeof props.error === 'string' ? t(props.error) : null}
      onChange={(event) => {
        onChange?.(event.currentTarget.value)
      }}
    />
  )
}
