
export const password = (value: string) => {
  const hasNumber = /\d/.test(value);
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const hasMinLength = value.length >= 6;

  if (!hasMinLength) return 'Password must be at least 6 characters';
  if (!hasNumber) return 'Password must include a number';
  if (!hasUpperCase) return 'Password must include an uppercase letter';
  if (!hasLowerCase) return 'Password must include a lowercase letter';
  if (!hasSpecial) return 'Password must include a special symbol';
  
  return null;
};