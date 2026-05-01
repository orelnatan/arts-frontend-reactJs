import { TextInput, type TextInputProps } from '@mantine/core';

interface InputTextProps extends Omit<TextInputProps, 'onChange'> {
  onChange?: (value: string) => void;
}

export default function InputText({ onChange, ...props }: InputTextProps) {
  return (
    <TextInput
      {...props}
      onChange={(event) => {
        onChange?.(event.currentTarget.value);
      }}
    />
  );
}