import { hasLength, isEmail } from '@mantine/form';

import { password } from '@arts/libs/form-utils';

export const VALIDATION_SCHEMA = {
  username: (value: string) => {        
    return (
      hasLength({ min: 5, max: 15 }, 'Must be 5-15 characters long')(value)
    );
  },
  email: (value: string) => {    
    return (
      isEmail('Invalid email')(value)
    );
  },
  password: (value: string) => {
    return (
      password(value)
    );
  },
}