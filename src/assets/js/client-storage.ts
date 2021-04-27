export const getUserObj = () => {
  return JSON.parse(sessionStorage.getItem('userObj')) ?? {};
};

export const getLocalToken = () => {
  return getUserObj().authToken;
};

export const updateUserObj = (argObj) => {
  sessionStorage.setItem('userObj', JSON.stringify({ ...getUserObj(), ...argObj }));
};

export const clearStorage = () => {
  sessionStorage.clear();
};
