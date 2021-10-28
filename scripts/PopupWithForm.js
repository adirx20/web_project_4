import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._formElement = this._popupElement.querySelector('.form');
    }

    _getInputValues = () => {
        const inputs = [...this._formElement.querySelectorAll('.form__input')];
        const inputValues = {};

        inputs.forEach(input => inputValues[input.name] = input.value);

        return inputValues;
    }

    setEventListeners = () => {
        super.setEventListeners();

        this._formElement.addEventListener('submit', () => {
            this._submitHandler(this._getInputValues());
        }
        )
    };

    close = () => {
        super.close();
        this._formElement.reset();
    }
}

// const profileName = '';
// const profileJob = '';

// const editProfileModal = new PopupWithForm('.popup_type_edit-profile', (data) => {
//     profileName.textContent = data.name;
//     profileJob.textContent = data.profession;
// });

export { PopupWithForm };