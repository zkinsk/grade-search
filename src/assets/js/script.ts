import jquery from 'jquery';

// const $ = (window.$ = window.jQuery = jquery);

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'; // Import precompiled Bootstrap css
import '@fortawesome/fontawesome-free/css/all.css';

import { getToken, getGrades, getMe, getCohortAssignments } from './api-calls';
import { getFormData, showForm, hideForm, showLogoutButton, hideLogoutButton } from './form';
import { getLocalToken, updateUserObj, clearStorage } from './client-storage';
import { buildAssignmentCards, buildGrades } from './assignments';
import { alertInfo, alertDanger, hideAlert } from './alert';
import { cohortButton } from '../components/cohort-button';

import { grades } from '../../hide/grades';

import {
  loginForm,
  inputs,
  loginFormContainer,
  getGradesBtn,
  assignmentRootElem,
  assignmentButtonContainer,
  logoutButtonElem,
} from './selectors';

import { Enrollment, AdaptedEnrollment } from './types/me-types';

let authToken: string | null;
let courseId = 3020;

console.log('running');

function handleSubmit(e: JQuery.SubmitEvent) {
  e.preventDefault();
  const { formData, clearableInputs } = getFormData(e.target);
  getToken(formData)
    .then((res) => {
      console.log(res);
      if (res.success) {
        alertInfo('Logged In!', 2000);
        clearableInputs.forEach((input) => (input.value = ''));
        hideForm(loginFormContainer);
        const { userId, authToken } = res.authenticationInfo || {};
        updateUserObj({ userId, authToken });
        checkForToken();
        return;
      }
      alertDanger('Incorrect Credentials', null);
    })
    .catch((e: Error) => {
      console.error(e);
      alertDanger(e.message, null);
    });
}

function fetchGrades() {
  assignmentRootElem.empty();
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

function buildUserEnrolmentObject(enrollments: Enrollment[]): AdaptedEnrollment[] {
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

function buildCohortButtons(enrollments: AdaptedEnrollment[]) {
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

function getCourseId(this: JQuery.SubmitEvent) {
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
  loginForm.on('submit', (e: JQuery.SubmitEvent) => handleSubmit(e));
  inputs.on('focus', () => hideAlert());
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
