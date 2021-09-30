class FormValidator {
    constructor(settings, formElement) {
        this.settings = settings;
        this.formElement = formElement;
    }

    showError = (inputElement) => {
        const { inputErrorClass } = this.settings;

        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        const errorMessage = inputElement.validationMessage;

        errorElement.textContent = errorMessage;
        inputElement.classList.add(inputErrorClass);
    }

    hideError = (inputElement) => {
        const { inputErrorClass } = this.settings;

        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);

        errorElement.textContent = '';
        inputElement.classList.remove(inputErrorClass);
    }

    checkValidity = (inputElement) => {
        if (input.validity.valid) {
            this.hideError(inputElement);
        }
        else {
            this.showError(inputElement);
        }
    }

    setEventListeners = () => {
        const { inputSelector, submitButtonSelector } = this.settings;

        const inputList = [...this.formElement.querySelectorAll(inputSelector)];
        const button = this.formElement.querySelector(submitButtonSelector);

        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                checkValidity(inputElement);
                toggleButtonState(inputList, button, settings);
            });
        });
    }

    enableValidation = () => {
        this.formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
    }
}

const settings = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
    inputErrorClass: 'form__input_theme_error',
    errorClass: "popup__error_visible"
};

const formElement = document.querySelector('.form');

const editForm = document.querySelector('.form');
const addCardForm = document.querySelector('.form');

const editFormValidator = new FormValidator(settings, formElement);
const addCardFormValidator = new FormValidator(settings, formElement);