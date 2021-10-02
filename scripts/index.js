import FormValidator from './FormValidator.js';
import { Card } from './Card.js';




// -----
// settings
const settings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_theme_error',
  errorClass: "popup__error_visible"
};

// cards
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

const cardItem = document.querySelector('.card-template').content.querySelector('.element');
const cardsContainer = document.querySelector('.elements');

// modals
const modals = [...document.querySelectorAll('.popup')];
const editProfileModal = document.querySelector('.popup_type_edit-profile');
const addCardModal = document.querySelector('.popup_type_add-card');
const imageModal = document.querySelector('.popup_type_image');

// close buttons
const editProfileModalCloseButton = editProfileModal.querySelector('.popup__close-button');
const addCardModalCloseButton = addCardModal.querySelector('.popup__close-button');
const imageModalCloseButton = imageModal.querySelector('.popup__close-button');

// open buttons
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// inputs 
const profileNameInput = document.querySelector('.form__input_type_name');
const profileJobInput = document.querySelector('.form__input_type_profession');
const cardTitleInput = document.querySelector('.form__input_type_card-title');
const cardLinkInput = document.querySelector('.form__input_type_card-link');

// forms
const editProfileForm = editProfileModal.querySelector('.form');
const addCardForm = addCardModal.querySelector('.form');
const formElement = document.querySelector('.form');

// profile modal elements
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__profession');

// image modal elements
const imageModalImage = document.querySelector('.popup__image');
const imageModalCaption = document.querySelector('.popup__caption');

// validators
const editProfileFormValidator = new FormValidator(settings, editProfileForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);

// call forms validation
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// functions
// -----
// close popup by pressing 'escape'
function modalKeyClose(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closeModal(popup);
  }
}

// modal close when clicking outside the popup
function modalClickOutside(evt) {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
}

// open modal function
function openModal(modal) {
  modal.classList.add('popup_opened');

  document.addEventListener('keydown', modalKeyClose);
  modal.addEventListener('click', modalClickOutside);
}

// close modal function
function closeModal(modal) {
  modal.classList.remove('popup_opened');

  document.removeEventListener('keydown', modalKeyClose);
  modal.removeEventListener('click', modalClickOutside);
}

// handle form submit function
function handleFormSubmit(evt) {
  evt.preventDefault();

  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;

  closeModal(editProfileModal);
}

// render card function
const cardTemplateSelector = '.card-template';

function renderCard(cardData, cardsContainer) {
  const cardElement = new Card(cardData, cardTemplateSelector);

  cardsContainer.prepend(cardElement.getCardElement());
}

// 'add card' submit handler function
function addCardSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({
    name: cardTitleInput.value,
    link: cardLinkInput.value
  }, cardsContainer);

  closeModal(addCardModal);
}

// 'edit profile' modal event listeners
// open modal
editProfileButton.addEventListener('click', () => {
  // editProfileFormValidator.resetValidation();
  editProfileFormValidator.resetValidation();

  const name = document.querySelector('.profile__name');
  const job = document.querySelector('.profile__profession');

  profileNameInput.value = name.textContent;
  profileJobInput.value = job.textContent;
  openModal(editProfileModal);
});

// close modal
editProfileModalCloseButton.addEventListener('click', () => {
  closeModal(editProfileModal);
});

// submit form
formElement.addEventListener('submit', handleFormSubmit);

// 'add card' modal event listeners
// open
addCardButton.addEventListener('click', () => {
  addCardFormValidator.resetValidation();

  openModal(addCardModal);
});

// close
addCardModalCloseButton.addEventListener('click', () => {
  closeModal(addCardModal);
});

// submit form
addCardForm.addEventListener('submit', addCardSubmitHandler);

// 'image' modal event listeners
imageModalCloseButton.addEventListener('click', () => {
  closeModal(imageModal);
});

// generate cards
initialCards.forEach(card => renderCard(card, cardsContainer));

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();