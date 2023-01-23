export function showInputError(inputElement, errorMessage, selectors) {
  const formError = document.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  formError.classList.add(selectors.errorClass);
  formError.textContent = errorMessage;
}

export function hideInputError(inputElement, selectors) {
  const formError = document.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  formError.classList.remove(selectors.errorClass);
  formError.textContent = '';
}

export function checkInputValidity(inputElement, selectors) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(inputElement, selectors);
  }
}

export function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  })
}

export function revalidateForm(formElement, selectors) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonSubmit = formElement.querySelector(selectors.submitButtonSelector);
  inputList.forEach(function (inputElement) {
    hideInputError(inputElement, selectors);
  })
  inactiveSubmitButton(buttonSubmit, selectors);
}

export function inactiveSubmitButton(buttonSubmit, { inactiveButtonClass }) {
  buttonSubmit.classList.add(inactiveButtonClass);
  buttonSubmit.disabled = true;
}

export function activeSubmitButton(buttonSubmit, { inactiveButtonClass }) {
  buttonSubmit.classList.remove(inactiveButtonClass);
  buttonSubmit.disabled = false;
}

export function toggleButtonState(inputList, buttonSubmit, selectors) {
  if (hasInvalidInput(inputList)) {
    inactiveSubmitButton(buttonSubmit, selectors);
  } else {
    activeSubmitButton(buttonSubmit, selectors);
  }
}

export function setEventListeners(formElement, selectors) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonSubmit = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, buttonSubmit, selectors);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, selectors);
      toggleButtonState(inputList, buttonSubmit, selectors);
    })
  })
}

export function enableValidation(selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach(function (formElement) {
    setEventListeners(formElement, selectors);
  })
}























