const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const formEl = document.querySelector('.feedback-form');
const emailInput = formEl.elements.email;
const messageTextarea = formEl.elements.message;

function saveFormDataToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function loadFormDataFromStorage() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) {
    return;
  }

  let parsedData;
  try {
    parsedData = JSON.parse(savedData);
  } catch (error) {
    return;
  }

  formData.email = parsedData.email ?? '';
  formData.message = parsedData.message ?? '';

  emailInput.value = formData.email;
  messageTextarea.value = formData.message;
}

function onFormInput(event) {
  const { name, value } = event.target;

  if (!(name in formData)) {
    return;
  }

  formData[name] = value.trim();
  saveFormDataToStorage();
}

function onFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log({ ...formData });

  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  formEl.reset();
}

loadFormDataFromStorage();

formEl.addEventListener('input', onFormInput);
formEl.addEventListener('submit', onFormSubmit);