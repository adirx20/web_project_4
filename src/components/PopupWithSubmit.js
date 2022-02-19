import { Popup } from './Popup.js';

// =====>
class PopupWithSubmit extends Popup {
    setAction(action) {
        this._submitHandler = action;
    }

    setEventListeners() {
        
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler();
            // this.close();
        }
        );
        
        super.setEventListeners();
    }
}
// <=====

export { PopupWithSubmit };