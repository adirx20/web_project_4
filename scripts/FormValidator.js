class FormValidator {
    constructor(settings, formElement) {
        this.settings = settings;
        this.formElement = formElement;
    }

    _showError = (inputElement) => {
        const { inputErrorClass } = this.settings;

        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        const errorMessage = inputElement.validationMessage;

        errorElement.textContent = errorMessage;
        inputElement.classList.add(inputErrorClass);
    }

    _hideError = (inputElement) => {
        const { inputErrorClass } = this.settings;

        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);

        errorElement.textContent = '';
        inputElement.classList.remove(inputErrorClass);
    }

    _checkValidity = (inputElement) => {
        if (inputElement.validity.valid) {
            this._hideError(inputElement);
        }
        else {
            this._showError(inputElement);
        }
    }

    _toggleButtonState = () => {
        const { inactiveButtonClass, submitButtonSelector } = this.settings;

        const buttonElement = this.formElement.querySelector(submitButtonSelector);

        if (this._isValid) {
            buttonElement.disabled = false;
            buttonElement.classList.remove(inactiveButtonClass);
        }
        else {
            buttonElement.disabled = 'disabled';
            buttonElement.classList.add(inactiveButtonClass);
        }
    }

    _isValid = () => this.inputList.every(inputElement => inputElement.validity.valid);

    _setEventListeners = () => {
        const { inputSelector } = this.settings;

        this.inputList = [...this.formElement.querySelectorAll(inputSelector)];

        this.inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkValidity(inputElement);
                this._toggleButtonState();
                console.log(this._isValid);
            });
        });
    }

    resetValidation = () => {
        this.inputList.forEach(inputElement => {
            this._hideError(inputElement);
        });

        this._toggleButtonState();
    }

    enableValidation = () => {
        this.formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });

        this._setEventListeners();
    }
}

export default FormValidator;



// const settings = {
//     inputSelector: '.form__input',
//     submitButtonSelector: '.form__save-button',
//     inactiveButtonClass: 'form__save-button_disabled',
//     inputErrorClass: 'form__input_theme_error',
//     errorClass: "popup__error_visible"
// };

// const formElement = document.querySelector('.form');

// const editForm = document.querySelector('.form');
// const addCardForm = document.querySelector('.form');

// const editFormValidator = new FormValidator(settings, formElement);
// const addCardFormValidator = new FormValidator(settings, formElement);