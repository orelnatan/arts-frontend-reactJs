import { useAuthContext } from '@arts/core';
import { PageLayout } from '@arts/libs/layout';

import './Desktop.scss';

export default function Desktop() {
  const { user } = useAuthContext();
  
  return (
    <PageLayout>
      <div>
        {JSON.stringify(user)}
      </div>
    </PageLayout>
  )
}

