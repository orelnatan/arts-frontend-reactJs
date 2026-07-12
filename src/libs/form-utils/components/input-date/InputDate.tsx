import { useTranslation } from 'react-i18next'
import { DatePickerInput, type DatePickerInputProps } from '@mantine/dates'

interface InputDateProps extends Omit<DatePickerInputProps, 'onChange'> {
  namespace?: string
  keyPrefix?: string
  label?: string
  onChange?: (value: string) => void
}

export default function InputDate({
  namespace,
  keyPrefix,
  label,
  onChange,
  ...props
}: InputDateProps) {
  const { t } = useTranslation(namespace, { keyPrefix })

  return (
    <DatePickerInput
      type="default"
      {...props}
      label={label ? t(label) : ''}
      placeholder={props.placeholder ? t(props.placeholder) : ''}
      error={typeof props.error === 'string' ? t(props.error) : null}
      onChange={(value) => {
        onChange?.(String(value))
      }}
    />
  )
}
