import { useTranslation } from 'react-i18next';
import { Button, type ButtonVariant } from '@mantine/core';

import './PrimaryButton.scss';

interface PrimaryButtonProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  label?: string; 
  namespace?: string;
  keyPrefix?: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function PrimaryButton({
  type = "submit",
  label,
  namespace,
  keyPrefix,
  loading,
  disabled,
  variant = 'filled',
  onClick,
}: PrimaryButtonProps) {
  const { t } = useTranslation(namespace, { keyPrefix });

  return (
    <div className='primary-button-main'>
      <Button
        variant={variant}
        loading={loading}
        disabled={disabled}
        type={type}
        onClick={onClick}
      >
        {t(label ?? '')}
      </Button>
    </div>
  );
}