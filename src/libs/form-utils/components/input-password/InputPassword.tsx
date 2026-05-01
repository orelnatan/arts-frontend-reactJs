import { PasswordInput, type PasswordInputProps } from '@mantine/core';

interface InputPasswordProps extends Omit<PasswordInputProps, 'onChange'> {
  onChange?: (value: string) => void;
}

export default function InputPassword({ onChange, ...props }: InputPasswordProps) {
  return (
    <PasswordInput
      {...props}
      onChange={(event) => {
        onChange?.(event.currentTarget.value);
      }}
    />
  );
}