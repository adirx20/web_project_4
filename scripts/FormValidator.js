// =====>
class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    _showError = (inputElement) => {
        const { inputErrorClass } = this._settings;

        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        const errorMessage = inputElement.validationMessage;

        errorElement.textContent = errorMessage;
        inputElement.classList.add(inputErrorClass);
    }

    _hideError = (inputElement) => {
        const { inputErrorClass } = this._settings;

        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

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
        const { inactiveButtonClass } = this._settings;

        if (this._isValid()) {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(inactiveButtonClass);
        }
        else {
            this._buttonElement.disabled = 'disabled';
            this._buttonElement.classList.add(inactiveButtonClass);
        }
    }

    _isValid = () => this._inputList.every(inputElement => inputElement.validity.valid);

    _setEventListeners = () => {
        const { inputSelector, submitButtonSelector } = this._settings;

        this._buttonElement = this._formElement.querySelector(submitButtonSelector);
        this._inputList = [...this._formElement.querySelectorAll(inputSelector)];

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    resetValidation = () => {
        this._inputList.forEach(inputElement => {
            this._hideError(inputElement);
        });

        this._toggleButtonState();
    }

    enableValidation = () => {
        this._formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });

        this._setEventListeners();
    }
}
// <=====

export default FormValidator;