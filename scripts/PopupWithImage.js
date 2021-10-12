import { Popup } from './Popup';

class PopupWithImage extends Popup {

    open = (link, text) => {
        const imageElement = this._popupElement.querySelector('.popup__image');
        const captionElement = this._popupElement.querySelector('.popup__caption');

        imageElement.src = link;
        captionElement.textContent = text;
    }
}