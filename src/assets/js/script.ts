import jquery from 'jquery';

// const $ = (window.$ = window.jQuery = jquery);

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'; // Import precompiled Bootstrap css
import '@fortawesome/fontawesome-free/css/all.css';

import { getToken, getGrades, getMe, getCohortAssignments } from './api-calls';
import { getFormData, showForm, hideForm, showLogoutButton, hideLogoutButton } from './form';
import { getLocalToken, updateUserObj, clearStorage } from './client-storage';
import {
  buildAssignmentCards,
  buildGrades,
  reduceCohortAssignments,
  buildCurrentCalendarAssignmentList,
  buildStudentAssignmentGrades,
} from './assignments';
import { alertInfo, alertDanger, hideAlert } from './alert';
import { cohortButton } from '../components/cohort-button';
import { classTable } from '../components/class-table';

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
import { MappedAssignments } from './types/calendar-assignments';
import { MappedStudentsWithAssignments } from './types/grades';

let authToken: string | null;

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

function buildUserEnrollmentObject(enrollments: Enrollment[]): AdaptedEnrollment[] {
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
  enrollments.forEach(({ id, cohortName, courseId }) => {
    assignmentButtonContainer.append(cohortButton({ id, cohortName, courseId }));
  });
}

function getUserCourses() {
  getMe(authToken)
    .then(({ Enrollments }) => {
      const userEnrollments = buildUserEnrollmentObject(Enrollments);
      buildCohortButtons(userEnrollments);
    })
    .catch((err) => {
      console.error(err);
    });
}

function buildClassTable(mappedAssignments: MappedAssignments, mappedStudents: MappedStudentsWithAssignments) {
  const table = classTable({ assignments: mappedAssignments, students: mappedStudents });
  assignmentRootElem.html(table);

  console.log(table);
}

function handleCourseClick(this: JQuery.SubmitEvent) {
  const id = parseInt($(this).data('id'));
  const courseId = parseInt($(this).data('course-id'));
  Promise.all([getCohortAssignments(id, authToken), getGrades(courseId, authToken)])
    .then(([rawCohortAssignments, rawStudentGrades]) => {
      const mappedAssignments = reduceCohortAssignments(rawCohortAssignments);
      const mappedStudentGrades = buildStudentAssignmentGrades(rawStudentGrades, mappedAssignments);
      buildClassTable(mappedAssignments, mappedStudentGrades);
      console.log(mappedStudentGrades, mappedAssignments);
    })
    .catch((e) => {
      console.error(e);
    });
}

function logout() {
  clearStorage();
  checkForToken();
}

function eventListeners() {
  loginForm.on('submit', (e: JQuery.SubmitEvent) => handleSubmit(e));
  inputs.on('focus', () => hideAlert());
  getGradesBtn.on('click', fetchGrades);
  assignmentButtonContainer.on('click', 'button', handleCourseClick);
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
