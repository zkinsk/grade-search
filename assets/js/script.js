import { getToken } from './requests.js';
import { getFormData, hideForm, showAlert, hideAlert } from './form.js';

const loginForm = $('.login-form');
const inputs = $('.login-form input');
const loginFormContainer = $('.login-form-container');
const alertElem = $('.alert-message');

function handleSubmit(e) {
  e.preventDefault();
  const { formData, clearableInputs } = getFormData(e.target);
  getToken(formData)
    .then((res) => {
      console.log(res);
      if (res.success) {
        clearableInputs.forEach((input) => (input.value = ''));
        hideForm(loginFormContainer);
        return;
      }
      showAlert(alertElem, 'Incorrect Credentials');
    })
    .catch((e) => {
      console.error(e);
      showAlert(alertElem, e.message);
    });
}

function eventListeners() {
  loginForm.on('submit', handleSubmit);
  inputs.focus(() => hideAlert(alertElem));
  // inputs.on('change', () => console.log('changing'));
}

function init() {
  eventListeners();
}

$('document').ready(() => {
  init();
});
