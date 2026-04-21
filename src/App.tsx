import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { appRoutes } from './app.routes';
import { AppLayout } from './libs/layout';

import './App.scss'

export default function App() {
  const routes = useRoutes(appRoutes);
  
  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>
        { routes }
      </Suspense>
    </AppLayout>
  )
}