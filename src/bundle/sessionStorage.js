export const addUserToSessionStorage = (user) => {
  sessionStorage.setItem('adminUser', JSON.stringify(user));
};

export const removeUserFromSessionStorage = () => {
  sessionStorage.removeItem('adminUser');
};

export const getUserFromSessionStorage = () => {
  const result = sessionStorage.getItem('adminUser');
  const user = result ? JSON.parse(result) : null;
  return user;
};
