// =====>
const imageModalSelector = document.querySelector('.popup_type_image');
const imageModalImage = document.querySelector('.popup__image');
const imageModalCaption = document.querySelector('.popup__caption');

const openModal = (modal) => {
    modal.classList.add('popup_opened');

    document.addEventListener('keydown', modalKeyClose);
    modal.addEventListener('click', modalClickOutside);
}

const closeModal = (modal) => {
    modal.classList.remove('popup_opened');

    document.removeEventListener('keydown', modalKeyClose);
    modal.removeEventListener('click', modalClickOutside);
}

const modalKeyClose = (evt) => {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closeModal(popup);
    }
}

const modalClickOutside = (evt) => {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
}
// <=====

export { imageModalSelector, imageModalImage, imageModalCaption, openModal, closeModal, modalKeyClose, modalClickOutside };