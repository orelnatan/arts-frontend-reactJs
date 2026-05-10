import { useAuth } from '@arts/core';
import { PageLayout } from '@arts/libs/layout';

import './Desktop.scss';

export default function Desktop() {
  const { user } = useAuth();
  
  return (
    <PageLayout>
      <div>
        {JSON.stringify(user)}
      </div>
    </PageLayout>
  )
}

