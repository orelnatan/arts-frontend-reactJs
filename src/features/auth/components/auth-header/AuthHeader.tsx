import { Caption } from '@arts/shared/components'

import './AuthHeader.scss'

export default function AuthHeader() {
  return (
    <div className="auth-header-main">
      <b>
        <h2 className="arts-welcome-note jenna-sue">
          <Caption namespace="auth">welcome-note</Caption>
        </h2>
      </b>
    </div>
  )
}
