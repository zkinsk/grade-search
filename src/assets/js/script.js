import { getToken, getGrades, getMe, getCohortAssignments } from './api-calls.js';
import { getFormData, showForm, hideForm, showLogoutButton, hideLogoutButton } from './form.js';
import { getLocalToken, updateUserObj, clearStorage } from './client-storage.js';
import { buildAssignmentCards, buildGrades } from './assignments.js';
import { alertInfo, alertDanger, hideAlert } from './alert';
import { cohortButton } from '../components/cohort-button';

import { grades } from '../../hide/grades';

const loginForm = $('.login-form');
const inputs = $('.login-form input');
const loginFormContainer = $('.login-form-container');
const getGradesBtn = $('.get-grades');
const assignmentRootElem = $('.assignment-cards');
const assignmentButtonContainer = $('.assignment-buttons');
const logoutButtonElem = $('.logout-button');

let authToken;
let courseId = 3020;

function handleSubmit(e) {
  e.preventDefault();
  const { formData, clearableInputs } = getFormData(e.target);
  getToken(formData)
    .then((res) => {
      console.log(res);
      if (res.success) {
        alertInfo('Logged In!', 2000);
        clearableInputs.forEach((input) => (input.value = ''));
        hideForm(loginFormContainer);
        const { userId, authToken } = res.authenticationInfo;
        updateUserObj({ userId, authToken });
        checkForToken();
        return;
      }
      alertDanger('Incorrect Credentials', null);
    })
    .catch((e) => {
      console.error(e);
      alertDanger(e, null);
    });
}

function fetchGrades() {
  const builtAssignments = buildGrades(grades);
  console.log(builtAssignments);
  buildAssignmentCards(assignmentRootElem, builtAssignments);
  // getGrades(courseId, authToken)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //     showAlert(alertElem, e);
  //   });
}

function buildUserEnrolmentObject(enrollments) {
  // console.log('Me Data ', enrollments);
  const userEnrollments = enrollments.map((item) => ({
    id: item.id,
    courseId: item.courseId,
    courseRole: item.courseRole.name,
    cohortName: item.course.cohort.name,
    active: item.active,
    startDate: item.course.startDate,
    endDate: item.course.endDate,
  }));
  return userEnrollments;
}

function buildCohortButtons(enrollments) {
  enrollments.forEach(({ id, cohortName }) => {
    assignmentButtonContainer.append(cohortButton({ id, cohortName }));
  });
}

function getUserCourses() {
  getMe(authToken)
    .then(({ Enrollments }) => {
      const userEnrollments = buildUserEnrolmentObject(Enrollments);
      buildCohortButtons(userEnrollments);
    })
    .catch((err) => {
      console.error(err);
    });
}

function getCourseId() {
  const id = $(this).data('id');
  getCohortAssignments(id, authToken).then((res) => {
    console.log('res: ', res);
  });
  // console.log(id);
}

function logout() {
  clearStorage();
  checkForToken();
}

function eventListeners() {
  loginForm.on('submit', handleSubmit);
  inputs.focus(() => hide);
  getGradesBtn.on('click', fetchGrades);
  assignmentButtonContainer.on('click', 'button', getCourseId);
  logoutButtonElem.on('click', logout);
}

function checkForToken() {
  const token = getLocalToken();
  if (!token) {
    clearStorage();
    showForm(loginFormContainer);
    hideLogoutButton();
    return;
  }
  showLogoutButton();
  authToken = token;
  getUserCourses();
}

$('document').ready(() => {
  eventListeners();
  checkForToken();
});
