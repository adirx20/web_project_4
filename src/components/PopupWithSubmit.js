import { Popup } from './Popup.js';

// =====>
class PopupWithSubmit extends Popup {
    setAction(action) {
        this._handleSubmit = action;
    }

    setEventListeners() {
        
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        }
        );
        
        super.setEventListeners();
    }
}
// <=====

export { PopupWithSubmit };