const imageModal = document.querySelector('.popup_type_image');
const imageModalCloseButton = imageModal.querySelector('.popup__close-button');
const imageModalImage = document.querySelector('.popup__image');
const imageModalCaption = document.querySelector('.popup__caption');

function openModal(modal) {
    modal.classList.add('popup_opened');

    document.addEventListener('keydown', modalKeyClose);
    modal.addEventListener('click', modalClickOutside);
}

function closeModal(modal) {
    modal.classList.remove('popup_opened');

    document.removeEventListener('keydown', modalKeyClose);
    modal.removeEventListener('click', modalClickOutside);
}

function modalKeyClose(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closeModal(popup);
    }
}

function modalClickOutside(evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
}



export { imageModal, imageModalImage, imageModalCaption, openModal };