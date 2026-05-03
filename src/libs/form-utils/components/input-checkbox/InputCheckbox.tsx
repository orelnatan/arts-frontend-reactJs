import { Checkbox, type CheckboxProps } from '@mantine/core';

import './InputCheckbox.scss';

interface InputCheckboxProps extends Omit<CheckboxProps, 'onChange'> {
  label: string;
  onChange?: (checked: boolean) => void;
}

export default function InputCheckbox({ onChange, ...props }: InputCheckboxProps) {
  return (
    <div className='input-checkbox-main'>
      <Checkbox
        {...props}
        onChange={(event) => {
          onChange?.(event.currentTarget.checked);
        }}
      />
    </div>
  );
}