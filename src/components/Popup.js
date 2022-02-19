// =====>
class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this.close = this.close.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._formElement = this._popupElement.querySelector('.form');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    setEventListeners() {
        this._popupElement.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__close-button')
            || evt.target.classList.contains('popup_opened'))
            {
                this.close();
            }
        });
    }
}
// =====>

export { Popup };