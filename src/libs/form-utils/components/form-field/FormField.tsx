import { type PropsWithChildren } from 'react'

import { Space } from '../../models'
import './FormField.scss'

type FormFieldProps = PropsWithChildren & {
  marginTopSize?: Space
  widthPx?: number
  maxWidth?: number
}

export default function FormField({
  children,
  marginTopSize,
  widthPx,
  maxWidth,
}: FormFieldProps) {
  return (
    <div
      className={`
      form-field-main ${marginTopSize ? `margin-top-${marginTopSize.toLowerCase()}` : ''}`}
      style={{ width: `${widthPx}px`, maxWidth: `${maxWidth}px` }}
    >
      {children}
    </div>
  )
}
