export const getUserObj = () => {
  return JSON.parse(sessionStorage.getItem('userObj')) ?? {};
};

export const getLocalToken = () => {
  return getUserObj().token;
};

export const updateUserObj = (args) => {
  sessionStorage.setItem('userObj', JSON.stringify({ ...getUserObj(), ...args }));
};
