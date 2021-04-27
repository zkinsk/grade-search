import { getToken, getGrades, getMe } from './api-calls.js';
import { getFormData, showForm, hideForm, showElement, hideElement, hideAfter } from './form.js';
import { getLocalToken, updateUserObj, clearStorage } from './client-storage.js';
import { buildAssignmentCards, buildGrades } from './assignments.js';
import { alertInfo, alertDanger, hideAlert } from './alert';

import { grades } from '../../hide/grades';

const loginForm = $('.login-form');
const inputs = $('.login-form input');
const loginFormContainer = $('.login-form-container');
const getGradesBtn = $('.get-grades');
const assignmentRoot = $('.assignment-cards');

let authToken;
let courseId = 3020;

function handleSubmit(e) {
  e.preventDefault();
  const { formData, clearableInputs } = getFormData(e.target);
  getToken(formData)
    .then((res) => {
      console.log(res);
      if (res.success) {
        showElement(alertInfo, 'Logged in!');
        hideAfter(alertInfo, 2000);
        clearableInputs.forEach((input) => (input.value = ''));
        hideForm(loginFormContainer);
        const { userId, authToken } = res.authenticationInfo;
        updateUserObj({ userId, authToken });
        checkForToken();
        return;
      }
      showAlert(alertDanger, 'Incorrect Credentials');
    })
    .catch((e) => {
      console.error(e);
      showAlert(alertDanger, e);
    });
}

function fetchGrades() {
  const builtAssignments = buildGrades(grades);
  console.log(builtAssignments);
  buildAssignmentCards(assignmentRoot, builtAssignments);
  // getGrades(courseId, authToken)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //     showAlert(alertElem, e);
  //   });
}

function getUserCourses() {
  getMe(authToken)
    .then((data) => {
      console.log('Me Data ', data);
    })
    .catch((err) => {
      console.error(err);
    });
}

function eventListeners() {
  loginForm.on('submit', handleSubmit);
  inputs.focus(() => hideAlert(alertDanger));
  getGradesBtn.on('click', fetchGrades);
}

function checkForToken() {
  const token = getLocalToken();
  if (!token) {
    clearStorage();
    showForm(loginFormContainer);
    return;
  }
  authToken = token;
  getUserCourses();
}

$('document').ready(() => {
  eventListeners();
  checkForToken();
});
