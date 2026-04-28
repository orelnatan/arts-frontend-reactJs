
import logo from '@arts/assets/images/png/arts-logo.png';

import './AuthHeader.scss'

export default function AuthHeader() {
  return (
    <div className='auth-header-main'>
      <b><h1 className='arts-welcome-note'>Welcome to Arts</h1></b>
      <img src={logo} alt="logo" width={45} />
    </div>
  )
}
