import { Popup } from './Popup.js';

// =====>
class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._formElement = this._popupElement.querySelector('.form');
    }

    _getInputValues() {
        const inputs = [...this._formElement.querySelectorAll('.form__input')];
        const inputValues = {};

        inputs.forEach(input => inputValues[input.name] = input.value);

        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleSubmit(this._getInputValues());
        }
        );
    };

    close() {
        super.close();

        this._formElement.reset();
    }
}
// <=====

export { PopupWithForm };