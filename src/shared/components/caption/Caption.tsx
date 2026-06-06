import { useTranslation } from 'react-i18next';

interface CaptionProps {
  namespace?: string;     
  keyPrefix?: string;  
  children: React.ReactNode; 
}

export default function Caption({ namespace, keyPrefix, children }: CaptionProps) {
  const { t } = useTranslation(namespace, { keyPrefix });

  // Fallback to empty string if children is somehow null or undefined
  const translationKey = typeof children === 'string' ? children : children?.toString() ?? '';

  return <>{t(translationKey)}</>;
}