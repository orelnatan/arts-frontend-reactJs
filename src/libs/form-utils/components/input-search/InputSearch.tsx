import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput, type TextInputProps } from '@mantine/core'
import { useDebounce } from 'use-debounce'

import { SvgIcon } from '@arts/shared/components'
import { magnifyingGlass } from '@arts/assets/images'

interface InputTextProps extends Omit<TextInputProps, 'onChange' | 'label'> {
  namespace?: string
  keyPrefix?: string
  label?: string
  debounceMs?: number
  onChange?: (value: string) => void
}

export default function InputSearch({
  namespace,
  keyPrefix,
  label,
  debounceMs = 0,
  onChange,
  ...props
}: InputTextProps) {
  const { t } = useTranslation(namespace, { keyPrefix })
  const [localValue, setLocalValue] = useState(props.value as string)
  const [debouncedValue] = useDebounce(localValue, debounceMs)

  useEffect(() => {
    onChange?.(debouncedValue)
  }, [debouncedValue, onChange])

  return (
    <TextInput
      {...props}
      label={label ? t(label) : ''}
      placeholder={props.placeholder ? t(props.placeholder) : ''}
      rightSection={<SvgIcon icon={magnifyingGlass} />}
      error={typeof props.error === 'string' ? t(props.error) : null}
      onChange={(event) => {
        setLocalValue(event.currentTarget.value)
      }}
    />
  )
}
