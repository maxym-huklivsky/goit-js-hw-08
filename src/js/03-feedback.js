import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const FORM_STORAGE = 'feedback-form-state';
const userInf = {};

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
  localStorage.removeItem(FORM_STORAGE);

  console.log(userInf);

  e.currentTarget.reset();
}
