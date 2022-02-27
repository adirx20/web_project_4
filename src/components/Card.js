// =====>
class Card {
    constructor({ data, handleCardClick, handleDeleteCard }, templateCardSelector, userId) {
        this._text = data.name;
        this._link = data.link;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
        this._templateCardSelector = templateCardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._userId = userId;
        console.log('this._userId', userId);

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

        if(this._ownerId !== this._userId) {
            this._deleteButton.style.display = 'none';
        }

        this._cardElement.querySelector('.element__likes-count').textContent = this._likes.length;
        // element__likes-count

        return this._cardElement;
    }
}
// <=====

export { Card };