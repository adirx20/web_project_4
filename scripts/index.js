import FormValidator from './FormValidator.js';
import { Card } from './Card.js';
import { openModal, closeModal, modalKeyClose, modalClickOutside } from './utils.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';

const imageModal = new PopupWithImage('.popup_type_image');
imageModal.setEventListeners();

const editModal = new PopupWithForm('.popup_type_edit-profile', (data) => {
  console.log('data: ', data);
  
  profileNameElement.textContent = data.name;
  profileJobElement.textContent = data.profession; 
});
editModal.setEventListeners();



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
const editProfileModalSelector = document.querySelector('.popup_type_edit-profile');
const addCardModalSelector = document.querySelector('.popup_type_add-card');
const imageModalSelector = document.querySelector('.popup_type_image');

// close buttons
const editProfileModalCloseButton = editProfileModalSelector.querySelector('.popup__close-button');
const addCardModalCloseButton = addCardModalSelector.querySelector('.popup__close-button');
const imageModalCloseButton = imageModalSelector.querySelector('.popup__close-button');

// open buttons
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// // inputs 
const profileNameInput = document.querySelector('.form__input_type_name');
const profileJobInput = document.querySelector('.form__input_type_profession');
const cardTitleInput = document.querySelector('.form__input_type_card-title');
const cardLinkInput = document.querySelector('.form__input_type_card-link');

// forms
const editProfileForm = editProfileModalSelector.querySelector('.form');
const addCardForm = addCardModalSelector.querySelector('.form');
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
// // handle form submit function
// const handleFormSubmit = (evt) => {
//   evt.preventDefault();

//   profileNameElement.textContent = profileNameInput.value;
//   profileJobElement.textContent = profileJobInput.value;

//   closeModal(editProfileModalSelector);
// }

// 'create card' and 'render card' functions


const cardTemplateSelector = '.card-template';

// const imageModal = new PopupWithImage('.popup_type_image');
// const addCardModal = new PopupWithForm('.popup_type_add-card', () => {});
// const editProfileModal = new PopupWithForm('.popup_type_edit-profile', () => {});

imageModal.setEventListeners();
// addCardModal.setEventListeners();
// editProfileModal.setEventListeners();

const createCard = (data) => {
  const card = new Card(data, cardTemplateSelector, (text, link) => {
    console.log('hello hello this is', text, link);
    imageModal.open(text, link);
  });

  return card.getCardElement();
}

const renderCard = (data) => {
  const cardElement = createCard(data);

  cardsContainer.prepend(cardElement);
}

// 'add card' submit handler function
const addCardSubmitHandler = (evt) => {
  evt.preventDefault();

  renderCard({
    name: cardTitleInput.value,
    link: cardLinkInput.value
  });

  closeModal(addCardModalSelector);
}

// 'edit profile' modal event listeners
// open modal
editProfileButton.addEventListener('click', () => {
  editProfileFormValidator.resetValidation();

  const name = document.querySelector('.profile__name');
  const job = document.querySelector('.profile__profession');

  profileNameInput.value = name.textContent;
  profileJobInput.value = job.textContent;
  // openModal(editProfileModalSelector);
  editModal.open();
});

// close modal
editProfileModalCloseButton.addEventListener('click', () => {
  closeModal(editProfileModalSelector);
});

// // submit form
// formElement.addEventListener('submit', handleFormSubmit);

// 'add card' modal event listeners
// open
addCardButton.addEventListener('click', () => {
  addCardForm.reset();

  addCardFormValidator.resetValidation();

  openModal(addCardModalSelector);
});

// close
addCardModalCloseButton.addEventListener('click', () => {
  closeModal(addCardModalSelector);
});

// submit form
addCardForm.addEventListener('submit', addCardSubmitHandler);

// // 'image' modal event listeners
// imageModalCloseButton.addEventListener('click', () => {
//   closeModal(imageModal);
// });

// generate cards
initialCards.forEach(card => renderCard(card));