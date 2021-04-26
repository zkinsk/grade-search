export const getFormData = (tar) => {
  const formData = {};
  const clearableInputs = [];
  for (let i = 0; i < tar.length; i++) {
    const item = tar[i];
    if (item.nodeName === 'INPUT') {
      const { name, value } = item;
      formData[name] = value.trim();
      clearableInputs.push(item);
    }
  }
  return { formData, clearableInputs };
};

export const hideForm = (formContainer) => {
  formContainer.addClass('d-none');
};
export const showForm = (formContainer) => {
  formContainer.removeClass('d-none');
};

export const hideElement = (element) => {
  element.text('');
  element.addClass('d-none');
};

export const showElement = (element, message) => {
  element.text(message);
  element.removeClass('d-none');
};

export const hideAfter = (elem, time = 1000) => {
  setTimeout(() => {
    hideElement(elem);
  }, time);
};
