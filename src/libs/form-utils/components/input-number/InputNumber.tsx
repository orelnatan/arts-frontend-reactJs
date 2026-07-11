import { useTranslation } from 'react-i18next'
import { NumberInput, type NumberInputProps } from '@mantine/core'

interface InputNumberProps extends Omit<
  NumberInputProps,
  'onChange' | 'label'
> {
  namespace?: string
  keyPrefix?: string
  label?: string
  onChange?: (value: number) => void
}

export default function InputNumber({
  namespace,
  keyPrefix,
  label,
  onChange,
  ...props
}: InputNumberProps) {
  const { t } = useTranslation(namespace, { keyPrefix })

  return (
    <NumberInput
      {...props}
      label={label ? t(label) : ''}
      placeholder={props.placeholder ? t(props.placeholder) : ''}
      error={typeof props.error === 'string' ? t(props.error) : null}
      onChange={(event) => {
        onChange?.(+event)
      }}
    />
  )
}
