import { type PropsWithChildren } from 'react';

import { Space } from '../../models';
import './FormRow.scss';

type FormRowProps = PropsWithChildren & {
  marginTopSize?: Space;
  gapSize?: Space;
  spaceBetween?: boolean;
  spaceEvenly?: boolean;
  spaceAround?: boolean;
  contentEnd?: boolean;
};

export default function FormRow({ 
  children, 
  marginTopSize,
  gapSize = Space.Sm, 
  spaceBetween, 
  spaceEvenly, 
  spaceAround, 
  contentEnd 
}: FormRowProps) {
  return (
    <div className={`
      form-row-main 
        ${marginTopSize ? `margin-top-${marginTopSize.toLowerCase()}` : ''}
        ${gapSize ? `gap-${gapSize.toLowerCase()}` : ''}
        ${spaceBetween ? 'space-between' : ''}
        ${spaceEvenly ? 'space-evenly' : ''}
        ${spaceAround ? 'space-around' : ''}
        ${contentEnd ? 'content-end' : ''}
      `}>
        {children}
    </div>
  );
}