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
        const { inactiveButtonClass, submitButtonSelector } = this._settings;

        const buttonElement = this._formElement.querySelector(submitButtonSelector);

        if (this._isValid()) {
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
        const { inputSelector } = this._settings;

        this.inputList = [...this._formElement.querySelectorAll(inputSelector)];

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
        this._formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });

        this._setEventListeners();
    }
}

export default FormValidator;