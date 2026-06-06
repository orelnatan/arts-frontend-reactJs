import { useTranslation } from 'react-i18next';
import { Checkbox, type CheckboxProps } from '@mantine/core';

import './InputCheckbox.scss';

interface InputCheckboxProps extends Omit<CheckboxProps, 'onChange'> {
  label: string; 
  namespace?: string;
  keyPrefix?: string;
  onChange?: (checked: boolean) => void;
}

export default function InputCheckbox({ namespace, keyPrefix, onChange, ...props }: InputCheckboxProps) {
  const { t } = useTranslation(namespace, { keyPrefix });

  return (
    <div className='input-checkbox-main'>
      <Checkbox
        {...props}
        label={t(props.label ?? '')}
        error={typeof props.error === "string" ? t(props.error) : null}
        onChange={(event) => {
          onChange?.(event.currentTarget.checked);
        }}
      />
    </div>
  );
}