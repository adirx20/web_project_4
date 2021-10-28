class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    open = () => {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close = () => {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    setEventListeners = () => {
        this._popupElement.querySelector('.popup__close-button').addEventListener('click', (evt) => {
            // if (evt.classList.contains('popup__close-button')) {
            //     this.close();
            // }
            this.close();
        });
    }
}

export {Popup};