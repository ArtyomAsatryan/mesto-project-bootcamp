export const formSelectors = {
    formSelector: ".form",
    inputSelector: ".form__field",
    submitButtonSelector: ".form__submit-button",
    inactiveButtonClass: "form__submit-button_disabled",
    inputErrorClass: "form__field_type_error",
    errorClass: "form__field-error_visible"
}

const showInputError = (formElement, inputElement, error, formSelectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formSelectors.inputErrorClass);
    errorElement.textContent = error;
    errorElement.classList.add(formSelectors.errorClass);
}

const hideInputError = (formElement, inputElement, formSelectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formSelectors.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(formSelectors.errorClass);

}

const isValid = (formElement, inputElement, formSelectors) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, formSelectors);
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, formSelectors);
    }
}

const hasInvalidInput = (formInputs) => {
    return formInputs.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

const toggleButtonState = (formInputs, buttonElement, formSelectors) => {
    if (hasInvalidInput(formInputs)) {
        buttonElement.classList.add(formSelectors.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(formSelectors.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

const setEventListeners = (formElement, formSelectors) => {
    const formInputs = Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
    const buttonElement = formElement.querySelector(formSelectors.submitButtonSelector);
    toggleButtonState(formInputs, buttonElement, formSelectors);


    formInputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, formSelectors);
            toggleButtonState(formInputs, buttonElement, formSelectors);
        });
    });
};

export const enableValidation = (formSelectors) => {
    const forms = Array.from(document.querySelectorAll(formSelectors.formSelector));

    forms.forEach((formElement) => {
        setEventListeners(formElement, formSelectors);
    });
};