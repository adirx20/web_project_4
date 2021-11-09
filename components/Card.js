import { imageModalSelector, imageModalImage, imageModalCaption, openModal } from './utils.js';

// =====>
class Card {
    constructor(data, templateCardSelector, handleCardClick) {
        this._text = data.name;
        this._link = data.link;
        this._templateCardSelector = templateCardSelector;
        this._handleCardClick = handleCardClick;

        this._cardTemplate = document.querySelector(templateCardSelector)
            .content.querySelector('.element');
    }

    _handleLikeIcon = () => this._likeButton.classList.toggle('element__like-button_active');

    _handleDeleteIcon = () => this._cardElement.remove();

    _setEventListeners = () => {
        this._image = this._cardElement.querySelector('.element__image');
        this._deleteButton = this._cardElement.querySelector('.element__delete-button');
        this._likeButton = this._cardElement.querySelector('.element__like-button');

        this._likeButton.addEventListener('click', () => this._handleLikeIcon());
        this._deleteButton.addEventListener('click', () => this._handleDeleteIcon());
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