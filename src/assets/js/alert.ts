import jquery from 'jquery';
const $ = (window.$ = window.jQuery = jquery);

const logoutButtonElem = $('.logout-button');

const alertDangerElem = $('.alert-danger');
const alertInfoElem = $('.alert-info');

type Alert = (message: string, time?: number | null) => void;

const hideElement = (element: JQuery<HTMLElement>) => {
  element.text('');
  element.addClass('d-none');
};
const showElement = (element: JQuery<HTMLElement>, message: string, time?: number | null) => {
  element.text(message);
  element.removeClass('d-none');
  hideAfter(element, time);
};

const hideAfter = (elem: JQuery<HTMLElement>, time: null | number = 1000) => {
  if (time === null) return;
  setTimeout(() => {
    hideElement(elem);
  }, time);
};

export const alertDanger: Alert = (message, time) => {
  showElement(alertDangerElem, message, time);
};

export const alertInfo: Alert = (message, time) => {
  showElement(alertInfoElem, message, time);
};

export const hideAlert = (type?: string) => {
  switch (type) {
    case 'danger':
      hideElement(alertDangerElem);
      break;
    case 'info':
      hideElement(alertInfoElem);
      break;
    default:
      hideElement(alertDangerElem);
      hideElement(alertInfoElem);
      break;
  }
};
