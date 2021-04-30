import { logoutButtonElem } from './selectors';

export const getFormData = (tar: HTMLInputElement[]) => {
  const formData: { [key: string]: string } = {};
  const clearableInputs = [];
  for (let i = 0; i < tar.length; i++) {
    const item: HTMLInputElement = tar[i];
    if (item.nodeName === 'INPUT') {
      const { name, value } = item;
      formData[name] = value.trim();
      clearableInputs.push(item);
    }
  }
  return { formData, clearableInputs };
};

export const hideForm = (formContainer: JQuery<HTMLFormElement>) => {
  formContainer.addClass('d-none');
};
export const showForm = (formContainer: JQuery<HTMLFormElement>) => {
  formContainer.removeClass('d-none');
};

export const showLogoutButton = () => {
  logoutButtonElem.removeClass('d-none');
};
export const hideLogoutButton = () => {
  logoutButtonElem.addClass('d-none');
};
