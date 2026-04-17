import { lazy } from 'react';

export const AuthLazy = lazy(() =>
  import('./components').then(m => ({ default: m.AuthRoot }))
);