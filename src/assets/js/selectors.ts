import jquery from 'jquery';
const $ = (window.$ = window.jQuery = jquery);

export const loginForm = $('.login-form');
export const inputs = $('.login-form input');
export const loginFormContainer = $('.login-form-container');
export const getGradesBtn = $('.get-grades');
export const assignmentRootElem = $('.assignment-cards');
export const assignmentButtonContainer = $('.assignment-buttons');
export const logoutButtonElem = $('.logout-button');
export const alertDangerElem = $('.alert-danger');
export const alertInfoElem = $('.alert-info');

export default $;
