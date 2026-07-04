import { hasLength, matches } from '@mantine/form'

export const password = (value: string) => {
  return (
    hasLength({ min: 6 }, 'validation.password-length')(value) ||
    matches(/\d/, 'validation.password-number')(value) ||
    // matches(/[A-Z]/, 'validation.password-uppercase')(value) ||
    matches(/[a-z]/, 'validation.password-lowercase')(value) ||
    // matches(/[!@#$%^&*(),.?":{}|<>]/, 'validation.password-special')(value) ||
    null
  )
}
