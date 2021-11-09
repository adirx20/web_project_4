import { Popup } from './Popup.js';

// =====>
class PopupWithImage extends Popup {

    open(text, link) {
        const caption = this._popupElement.querySelector('.popup__caption');
        const image = this._popupElement.querySelector('.popup__image');

        caption.textContent = text;
        image.src = link;

        super.open();
    }
}
// <=====

export { PopupWithImage };