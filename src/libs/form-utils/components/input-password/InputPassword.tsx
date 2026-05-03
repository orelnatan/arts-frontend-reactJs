import { PasswordInput, type PasswordInputProps } from '@mantine/core';

interface InputPasswordProps extends Omit<PasswordInputProps, 'onChange'> {
  onChange?: (value: string) => void;
  suppressErrorText?: boolean; 
}

export default function InputPassword({ 
  onChange, 
  error, 
  suppressErrorText, 
  ...props 
}: InputPasswordProps) {
  return (
    <PasswordInput
      {...props}
      error={suppressErrorText && error ? !!error : error}
      onChange={(event) => {
        onChange?.(event.currentTarget.value);
      }}
    />
  );
}