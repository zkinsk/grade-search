export const getToken = ({ email, password }) => {
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

export const getGrades = (courseId, authToken) => {
  if (!courseId || !authToken) {
    throw new Error('missing course id or auth token');
  }
  const url = 'https://bootcampspot.com/api/instructor/v1/grades';
  return $.ajax({
    url: url,
    type: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authToken: authToken,
    },
    data: JSON.stringify({ courseId }),
    contentType: 'application/json',
  });
};
