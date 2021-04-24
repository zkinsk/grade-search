import { getToken, getGrades } from './requests.js';
import { getFormData, showForm, hideForm, showAlert, hideAlert } from './form.js';
import { getLocalToken, updateUserObj } from './client-storage.js';

const loginForm = $('.login-form');
const inputs = $('.login-form input');
const loginFormContainer = $('.login-form-container');
const alertElem = $('.alert-message');
const getGradesBtn = $('.get-grades');

let authToken;
let courseId = 3020;

function handleSubmit(e) {
  e.preventDefault();
  const { formData, clearableInputs } = getFormData(e.target);
  getToken(formData)
    .then((res) => {
      console.log(res);
      if (res.success) {
        clearableInputs.forEach((input) => (input.value = ''));
        hideForm(loginFormContainer);
        const { userId, authToken } = res.authenticationInfo;
        updateUserObj({ userId, authToken });
        checkForToken();
        return;
      }
      showAlert(alertElem, 'Incorrect Credentials');
    })
    .catch((e) => {
      console.error(e);
      showAlert(alertElem, e.message);
    });
}

function fetchGrades() {
  getGrades(courseId, authToken).then((res) => {
    console.log(res);
  });
}

function eventListeners() {
  loginForm.on('submit', handleSubmit);
  inputs.focus(() => hideAlert(alertElem));
  getGradesBtn.on('click', fetchGrades);
}

function checkForToken() {
  const token = getLocalToken();
  if (!token) {
    showForm(loginFormContainer);
    return;
  }
  authToken = token;
}

function init() {
  eventListeners();
  checkForToken();
}

$('document').ready(() => {
  init();
});
