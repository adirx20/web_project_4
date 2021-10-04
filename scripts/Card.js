import { imageModal, imageModalImage, imageModalCaption, openModal } from './utils.js';



class Card {
    constructor({ name, link }, templateCardSelector) {
        this._name = name;
        this._link = link;
        this._templateCardSelector = templateCardSelector;

        this._cardTemplate = document.querySelector(templateCardSelector)
            .content.querySelector('.element');
    }

    _handleLikeIcon = () => this._likeButton.classList.toggle('element__like-button_active');

    _handleDeleteIcon = () => this._cardElement.remove();

    _handlePreviewPicture = () => {
        openModal(imageModal);

        imageModalImage.src = this._link;
        imageModalCaption.textContent = this._name;
    }

    _setEventListeners = () => {
        const image = this._cardElement.querySelector('.element__image');
        const deleteButton = this._cardElement.querySelector('.element__delete-button');
        this._likeButton = this._cardElement.querySelector('.element__like-button');

        this._likeButton.addEventListener('click', this._handleLikeIcon);
        deleteButton.addEventListener('click', this._handleDeleteIcon);
        image.addEventListener('click', this._handlePreviewPicture);
    }

    getCardElement = () => {
        this._cardElement = this._cardTemplate.cloneNode(true);

        const title = this._cardElement.querySelector('.element__title');
        const image = this._cardElement.querySelector('.element__image');

        title.textContent = this._name;
        image.style.backgroundImage = `url(${this._link})`;

        this._setEventListeners();

        return this._cardElement;
    }
}



export { Card };