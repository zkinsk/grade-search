import { logoutButtonElem } from './selectors';

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

export const showLogoutButton = () => {
  logoutButtonElem.removeClass('d-none');
};
export const hideLogoutButton = () => {
  logoutButtonElem.addClass('d-none');
};
