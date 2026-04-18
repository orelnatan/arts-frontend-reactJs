import { lazy } from 'react';

export const HomeLazy = lazy(() =>
  import('./components').then(m => ({ default: m.HomeRoot }))
);