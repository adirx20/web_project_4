// =====>
class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this.close = this.close.bind(this);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keyup', (evt) => this._handleEscClose(evt));
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keyup', (evt) => this._handleEscClose(evt));
    }

    setEventListeners() {
        this._popupElement.querySelector('.popup__close-button').addEventListener('click', this.close);
    }
}
// =====>

export { Popup };