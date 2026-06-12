import { useContext } from 'react';

import { DirectionContext } from '../contexts';

export const useDirectionContext = () => {
  const context = useContext(DirectionContext);
  
  if (!context) {
    throw new Error('useDirectionContext must be used within a DirectionProvider');
  }
  
  return context;
};