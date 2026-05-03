
export const isTruthy = (message: string) => 
  (value: boolean) => value === true ? null : message;