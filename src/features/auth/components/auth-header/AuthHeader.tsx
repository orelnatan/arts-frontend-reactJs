
import { logo } from '@arts/assets/images';

import './AuthHeader.scss'

export default function AuthHeader() {
  return (
    <div className='auth-header-main'>
      <b><h1 className='arts-welcome-note jenna-sue'>Welcome to Arts</h1></b>
      <img src={logo} alt="logo" width={45} />
    </div>
  )
}
