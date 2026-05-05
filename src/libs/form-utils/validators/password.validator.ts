import { hasLength, matches } from '@mantine/form';

export const password = (value: string) => {
  return (
    hasLength({ min: 6 }, 'Password must be at least 6 characters')(value) ||
    matches(/\d/, 'Password must include a number')(value) ||
   // matches(/[A-Z]/, 'Password must include an uppercase letter')(value) ||
    matches(/[a-z]/, 'Password must include a lowercase letter')(value) ||
   // matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must include a special symbol')(value) ||
    null
  );
};