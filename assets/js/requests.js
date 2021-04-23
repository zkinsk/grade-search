export const getToken = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Complete Login form');
  }
  const url = 'https://bootcampspot.com/api/instructor/v1/login';
  return $.ajax({
    contentType: 'application/json',
    dataType: 'json',
    type: 'POST',
    url: url,
    data: JSON.stringify({
      email,
      password,
    }),
  });
};
