const alertDangerElem = $('.alert-danger');
const alertInfoElem = $('.alert-info');

const hideElement = (element) => {
  element.text('');
  element.addClass('d-none');
};
const showElement = (element, message, time) => {
  element.text(message);
  element.removeClass('d-none');
  hideAfter(element, time);
};

const hideAfter = (elem, time = 1000) => {
  if (time === null) return;
  setTimeout(() => {
    hideElement(elem);
  }, time);
};

export const alertDanger = (message, time) => {
  showElement(alertDangerElem, message, time);
};

export const alertInfo = (message, time) => {
  showElement(alertInfoElem, message, time);
};

export const hideAlert = (type) => {
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
