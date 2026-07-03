import { hasLength, isEmail } from '@mantine/form';

import { password } from '@arts/libs/form-utils';

export const VALIDATION_SCHEMA = {
  username: (value: string) => {        
    return (
      hasLength({ min: 5, max: 15 }, 'validation.username-length')(value)
    );
  },
  email: (value: string) => {    
    return (
      isEmail('validation.email')(value)
    );
  },
  password: (value: string) => {
    return (
      password(value)
    );
  },
  // rememberMe: (value: boolean) => {    
  //   return (
  //     isTruthy('validation.remember-me')(value)
  //   );
  // },
}