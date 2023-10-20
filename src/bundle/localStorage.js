export const addUserToLocalStorage = (user) => {
  localStorage.setItem('adminUser', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('adminUser');
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('adminUser');
  const user = result ? JSON.parse(result) : null;
  return user;
};
