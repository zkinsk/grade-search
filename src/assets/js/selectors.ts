import jquery from 'jquery';
const $ = (window.$ = window.jQuery = jquery);

export const loginForm: JQuery<HTMLFormElement> = $('.login-form');
export const inputs: JQuery<HTMLInputElement> = $('.login-form input');
export const loginFormContainer: JQuery<HTMLFormElement> = $('.login-form-container');
export const getGradesBtn: JQuery<HTMLButtonElement> = $('.get-grades');
export const assignmentRootElem: JQuery<HTMLDivElement> = $('.assignment-cards');
export const assignmentButtonContainer: JQuery<HTMLDivElement> = $('.assignment-buttons');
export const logoutButtonElem: JQuery<HTMLButtonElement> = $('.logout-button');
export const alertDangerElem: JQuery<HTMLDivElement> = $('.alert-danger');
export const alertInfoElem: JQuery<HTMLDivElement> = $('.alert-info');
export const logInButton: JQuery<HTMLButtonElement> = $('#log-in-button');

export default $;
