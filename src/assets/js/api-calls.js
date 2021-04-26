import { me } from '../../hide/me';

const rootUrl = `https://bootcampspot.com`;

const mockLogin = {
  success: true,
  errorCode: null,
  resetToken: null,
  authenticationInfo: {
    userId: 13786,
    firstLogin: false,
    active: true,
    authToken: 'fake-token',
  },
};

export const getToken = ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Complete Login form');
  }
  return Promise.resolve(mockLogin);
  const url = rooUrl + '/api/instructor/v1/login';
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
  const url = rootUrl + '/api/instructor/v1/grades';
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

export const getMe = (authToken) => {
  if (!authToken) {
    throw new Error('No Auth Token Provided');
  }
  return Promise.resolve(me);
  const url = rootUrl + '/api/instructor/v1/me';
  return $.ajax({
    url: url,
    type: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authToken: authToken,
    },
  });
};
