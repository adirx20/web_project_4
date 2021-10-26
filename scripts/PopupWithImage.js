import { Popup } from './Popup.js';

class PopupWithImage extends Popup {

    open = (data) => {
        const captionElement = this._popupElement.querySelector('.popup__caption');
        const imageElement = this._popupElement.querySelector('.popup__image');

        captionElement.textContent = data.text;
        imageElement.src = data.link;

        super.open();
    }
}

export { PopupWithImage };