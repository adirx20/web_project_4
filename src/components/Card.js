// =====>
class Card {
    constructor({ data, handleCardClick, handleDeleteCard }, templateCardSelector) {
        this._text = data.name;
        this._link = data.link;
        this._id = data._id;
        this._templateCardSelector = templateCardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;

        this._cardTemplate = document.querySelector(templateCardSelector)
            .content.querySelector('.element');
    }

    _handleLikeIcon = () => this._likeButton.classList.toggle('element__like-button_active');

    removeCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _setEventListeners = () => {
        this._image = this._cardElement.querySelector('.element__image');
        this._deleteButton = this._cardElement.querySelector('.element__delete-button');
        this._likeButton = this._cardElement.querySelector('.element__like-button');

        this._likeButton.addEventListener('click', () => this._handleLikeIcon());
        this._deleteButton.addEventListener('click', () => this._handleDeleteCard(this._id));
        this._image.addEventListener('click', () => this._handleCardClick(this._text, this._link));
    }

    getCardElement = () => {
        this._cardElement = this._cardTemplate.cloneNode(true);

        const title = this._cardElement.querySelector('.element__title');
        const image = this._cardElement.querySelector('.element__image');

        title.textContent = this._text;
        image.style.backgroundImage = `url(${this._link})`;

        this._setEventListeners();

        return this._cardElement;
    }
}
// <=====

export { Card };