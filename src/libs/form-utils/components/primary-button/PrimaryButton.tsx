import { Button, type ButtonVariant } from '@mantine/core';

import './PrimaryButton.scss';

interface PrimaryButtonProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  label?: string;
  loading?: boolean;
  variant?: ButtonVariant;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function PrimaryButton({
  type = "submit",
  label,
  loading,
  variant = 'filled',
  onClick,
}: PrimaryButtonProps) {
  return (
    <div className='primary-button-main'>
      <Button
        variant={variant}
        loading={loading}
        type={type}
        onClick={onClick}
      >
        {label}
      </Button>
    </div>
  );
}