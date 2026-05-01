import { type PropsWithChildren } from 'react';

import { Space } from '../../models';
import './FormField.scss';

type FormFieldProps = PropsWithChildren & {
  marginTopSize?: Space;
  widthPx?: number; 
};

export default function FormField({ children, marginTopSize, widthPx }: FormFieldProps) {
  return (
    <div className={`form-field-main ${marginTopSize ? `margin-top-${marginTopSize.toLowerCase()}` : ''}`}
      style={{ width: `${widthPx}px` }}>
      {children}
    </div>
  );
}