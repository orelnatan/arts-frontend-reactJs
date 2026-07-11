import { NumericFormat, type NumericFormatProps } from 'react-number-format'
import { useTranslation } from 'react-i18next'

interface NumericPrettierProps extends Omit<
  NumericFormatProps,
  'prefix' | 'suffix'
> {
  namespace?: string
  keyPrefix?: string
  prefix?: string
  suffix?: string
}

export default function NumericPrettier({
  namespace,
  keyPrefix,
  prefix = '',
  suffix = '',
  ...rest
}: NumericPrettierProps) {
  const { t } = useTranslation(namespace, { keyPrefix })

  return (
    <NumericFormat
      {...rest}
      prefix={prefix ? ` ${t(prefix)} ` : ''}
      suffix={suffix ? ` ${t(suffix)} ` : ''}
    />
  )
}
