import { useContext } from 'react';

import { LocaleContext } from '../contexts'; 

export const useLocaleContext = () => {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('useLocaleContext must be used within a LocaleProvider');
  }

  return context;
};