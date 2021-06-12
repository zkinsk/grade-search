import { me } from '../../hide/me';
import { assignments } from '../../hide/assignments-res';
import { grades } from '../../hide/grades';

import LoginRes, { LoginForm } from './types/login-types';
import StudentAssignmentGrades from './types/grades';
import Me from './types/me-types';
import CohortAssignments from './types/calendar-assignments';

const rootUrl = `https://bootcampspot.com`;

type GetGrades = (arg1?: number, arg2?: string | null) => Promise<StudentAssignmentGrades[]>;
type GetMe = (arg1?: string | null) => Promise<Me>;
type GetCohortAssignments = (arg1?: number, arg2?: string | null) => Promise<CohortAssignments>;

export const getToken = ({ email, password }: LoginForm) => {
  // const mockLogin: LoginRes = {
  //   success: true,
  //   errorCode: null,
  //   resetToken: null,
  //   authenticationInfo: {
  //     userId: 13786,
  //     firstLogin: false,
  //     active: true,
  //     authToken: 'fake-token',
  //   },
  // };
  if (!email || !password) {
    return Promise.reject(Error('Complete Login form'));
  }
  // if (password === 'error') {
  //   console.log('error');
  //   mockLogin.errorCode = 'Incorrect Credentials';
  //   mockLogin.success = false;
  //   mockLogin.authenticationInfo = null;
  // }
  // return Promise.resolve(mockLogin);
  const url = rootUrl + '/api/instructor/v1/login';
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

export const getGrades: GetGrades = (courseId, authToken) => {
  if (!courseId || !authToken) {
    throw new Error('missing course id or auth token');
  }
  // return Promise.resolve(grades);
  const url = rootUrl + '/api/instructor/v1/grades';
  return new Promise((resolve, reject) => {
    resolve(
      $.ajax({
        url: url,
        type: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authToken: authToken,
        },
        data: JSON.stringify({ courseId }),
        contentType: 'application/json',
      })
    );
  });
};

export const getMe: GetMe = (authToken) => {
  if (!authToken) {
    throw new Error('No Auth Token Provided');
  }
  // return Promise.resolve(me);
  const url = rootUrl + '/api/instructor/v1/me';
  return Promise.resolve(
    $.ajax({
      url: url,
      type: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authToken: authToken,
      },
    })
  );
};

export const getCohortAssignments: GetCohortAssignments = (enrollmentId, authToken) => {
  if (!authToken) {
    throw new Error('No Auth Token Provided');
  }
  console.log('enrollment id: ', enrollmentId, ' & ', authToken);
  // return Promise.resolve(assignments);
  const url = rootUrl + '/api/instructor/v1/assignments';
  return Promise.resolve(
    $.ajax({
      url,
      type: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authToken: authToken,
      },
      data: JSON.stringify({ enrollmentId }),
    })
  );
};
