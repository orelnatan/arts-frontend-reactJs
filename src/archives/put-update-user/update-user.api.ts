
export const updateUser = (user: User): Promise<User> => {
  return api.PUT<User>('/update-user', user);
};