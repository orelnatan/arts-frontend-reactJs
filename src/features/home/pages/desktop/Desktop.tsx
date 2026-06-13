import { useAuthContext } from '@arts/core';
import { PageLayout } from '@arts/libs/layout';

import './Desktop.scss';

export default function Desktop() {
  const { user } = useAuthContext();
  
  return (
    <PageLayout>
      <h1>Welcome {user?.name}!</h1>

      <div>
        {JSON.stringify(user)}
      </div>
    </PageLayout>
  )
}

