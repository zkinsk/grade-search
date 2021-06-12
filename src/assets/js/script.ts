import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getToken, getGrades, getMe, getCohortAssignments } from './api-calls';
import { getFormData, showForm, hideForm, showLogoutButton, hideLogoutButton } from './form';
import { getLocalToken, updateUserObj, clearStorage } from './client-storage';
import { reduceCohortAssignments, buildStudentAssignmentGrades } from './assignments';
import { alertInfo, alertDanger, hideAlert } from './alert';
import { cohortButton } from '../components/cohort-button';
import { classTable } from '../components/class-table';

import {
  loginForm,
  inputs,
  loginFormContainer,
  assignmentRootElem,
  assignmentButtonContainer,
  logoutButtonElem,
  logInButton,
} from './selectors';

import { Enrollment, AdaptedEnrollment } from './types/me-types';
import { MappedAssignments } from './types/calendar-assignments';
import { MappedStudentsWithAssignments } from './types/grades';
import LoginResponse from './types/login-types';

let authToken: string | null;

function handleLogin(res: LoginResponse) {
  alertInfo('Logged In!', 2000);
  hideForm(loginFormContainer);
  const { userId, authToken } = res.authenticationInfo || {};
  updateUserObj({ userId, authToken });
  checkForToken();
}

function handleSubmit(e: JQuery.SubmitEvent) {
  e.preventDefault();
  logInButton.prop('disabled', true);
  const { formData, clearableInputs } = getFormData(e.target);
  getToken(formData)
    .then((res) => {
      if (res.success) {
        clearableInputs.forEach((input) => (input.value = ''));
        handleLogin(res);
        logInButton.prop('disabled', false);
        return;
      }
      logInButton.prop('disabled', false);
      alertDanger('Incorrect Credentials', null);
    })
    .catch((e: Error) => {
      logInButton.prop('disabled', false);
      console.error(e);
      alertDanger(e.message, null);
    });
}

function buildUserEnrollmentObject(enrollments: Enrollment[]): AdaptedEnrollment[] {
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
  assignmentButtonContainer.empty();
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
}

function handleCourseClick(this: JQuery.SubmitEvent) {
  assignmentButtonContainer.find('button').each(function () {
    $(this).removeClass('active');
  });
  $(this).addClass('active');
  const id = parseInt($(this).data('id'));
  const courseId = parseInt($(this).data('course-id'));
  Promise.all([getCohortAssignments(id, authToken), getGrades(courseId, authToken)])
    .then(([rawCohortAssignments, rawStudentGrades]) => {
      const mappedAssignments = reduceCohortAssignments(rawCohortAssignments);
      const mappedStudentGrades = buildStudentAssignmentGrades(rawStudentGrades, mappedAssignments);
      buildClassTable(mappedAssignments, mappedStudentGrades);
    })
    .catch((e) => {
      console.error(e);
    });
}

function logout() {
  clearStorage();
  checkForToken();
  assignmentButtonContainer.empty();
  assignmentRootElem.empty();
}

function eventListeners() {
  loginForm.on('submit', (e: JQuery.SubmitEvent) => handleSubmit(e));
  inputs.on('focus', () => hideAlert());
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
