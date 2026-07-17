import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FileInput, type FileInputProps } from '@mantine/core'

import { Caption, SvgIcon } from '@arts/shared/components'
import { cancelCircle } from '@arts/assets/images'

import { fileToBase64 } from './file-to-base-64.util'

interface InputImageProps extends Omit<
  FileInputProps,
  'onChange' | 'multiple' | 'placeholder'
> {
  namespace?: string
  keyPrefix?: string
  label?: string
  placeholder?: string
  onChange?: (value: string | null) => void
}

export default function InputImage({
  namespace,
  keyPrefix,
  label,
  placeholder,
  onChange,
  ...props
}: InputImageProps) {
  const { t } = useTranslation(namespace, { keyPrefix })
  const [file, setFile] = useState<File | null>(null)

  return (
    <FileInput
      {...props}
      accept="image/*"
      value={file}
      label={label ? t(label) : ''}
      rightSection={
        <span style={{ color: 'var(--color-error)', cursor: 'pointer' }}>
          <SvgIcon
            icon={cancelCircle}
            onClick={() => {
              setFile(null)

              onChange?.(null)
            }}
          />
        </span>
      }
      placeholder={
        placeholder ? (
          <Caption namespace={namespace} keyPrefix={keyPrefix}>
            {placeholder}
          </Caption>
        ) : null
      }
      error={typeof props.error === 'string' ? t(props.error) : null}
      onChange={async (value) => {
        setFile(value)

        onChange?.(await fileToBase64(value))
      }}
    />
  )
}
