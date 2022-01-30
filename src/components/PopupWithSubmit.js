import { Popup } from './Popup.js';

// =====>
class PopupWithSubmit extends Popup {
    setAction(action) {
        this._submitHandler = action;
    }

    setEventListeners() {
        super.setEventListeners();

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler();
            this.close();
        }
        );
    }
}
// <=====

export { PopupWithSubmit };