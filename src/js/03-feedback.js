import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const FORM_STORAGE = 'feedback-form-state';
const autocomplete = localStorage.getItem(FORM_STORAGE);
let userInf = autocomplete ? JSON.parse(autocomplete) : {};

autocompleteInput();

form.addEventListener('input', throttle(onSaveValueInputs, 500));
form.addEventListener('submit', onSubmitForm);

function onSaveValueInputs(e) {
  userInf[e.target.name] = e.target.value;
  localStorage.setItem(FORM_STORAGE, JSON.stringify(userInf));
}

function autocompleteInput() {
  const autocomplete = localStorage.getItem(FORM_STORAGE);

  if (autocomplete) {
    const parseAutocomplete = JSON.parse(autocomplete);
    const keys = Object.keys(parseAutocomplete);
    for (const key of keys) {
      const input = document.querySelector(`[name="${key}"]`);

      input.value = parseAutocomplete[key];
    }
  }
}

function onSubmitForm(e) {
  e.preventDefault();

  const formEls = e.currentTarget.elements;
  if (formEls.email.value === '' || formEls.message.value === '') {
    return alert(`Всі поля обов'язково повинні бути заповнені!`);
  }

  console.log(JSON.parse(localStorage.getItem(FORM_STORAGE)));

  localStorage.removeItem(FORM_STORAGE);
  userInf = {};
  e.currentTarget.reset();
}
