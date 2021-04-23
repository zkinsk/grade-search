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

export const hideAlert = (alertContainer) => {
  alertContainer.text('');
  alertContainer.addClass('d-none');
};

export const showAlert = (alertContainer, message) => {
  alertContainer.text(message);
  alertContainer.removeClass('d-none');
};
