import { Popup } from './Popup.js';

class PopupWithImage extends Popup {

    open(text, link) {
        const caption = this._popupElement.querySelector('.popup__caption');
        const imageElement = this._popupElement.querySelector('.popup__image');

        caption.textContent = text;
        imageElement.src = link;

        super.open();
    }
}

export { PopupWithImage };