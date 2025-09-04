export const validateAdminForm = (data) => {
  const errors = {};
  if (!data.username) errors.username = 'Username required';
  if (!data.email.includes('@')) errors.email = 'Invalid email';
  if (data.password.length < 6) errors.password = 'Password too short';
  return errors;
};
