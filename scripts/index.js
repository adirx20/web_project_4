import FormValidator from './FormValidator.js';
import { Card } from './Card.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

// =====>
// SETTINGS
const settings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_theme_error',
  errorClass: "popup__error_visible"
};

// CARDS
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

const cardsContainer = document.querySelector('.elements');

// SELECTORS
const editProfileModalSelector = document.querySelector('.popup_type_edit-profile');
const addCardModalSelector = document.querySelector('.popup_type_add-card');

// OPEN BUTTONS
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// INPUTS 
const profileNameInput = document.querySelector('.form__input_type_name');
const profileJobInput = document.querySelector('.form__input_type_profession');

// FORMS
const editProfileForm = editProfileModalSelector.querySelector('.form');
const addCardForm = addCardModalSelector.querySelector('.form');

// // PROFILE MODAL ELEMENTS
// const profileNameElement = document.querySelector('.profile__name');
// const profileJobElement = document.querySelector('.profile__profession');

// VALIDATORS
const editProfileFormValidator = new FormValidator(settings, editProfileForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);

// CALL FORMS VALIDATON
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// USER INFO
const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileJobSelector: '.profile__profession'
});

// MODALS
const imageModal = new PopupWithImage('.popup_type_image');
imageModal.setEventListeners();

const editProfileModal = new PopupWithForm('.popup_type_edit-profile', data => userInfo.setUserInfo(data));
editProfileModal.setEventListeners();

const addCardModal = new PopupWithForm('.popup_type_add-card', (data) => {
  renderCard({
    name: data['card-title'],
    link: data['card-link']
  });
});
addCardModal.setEventListeners();

// FUNCTIONS
const cardTemplateSelector = '.card-template';

const createCard = (data) => {
  const card = new Card(data, cardTemplateSelector, (text, link) => {
    imageModal.open(text, link);
  });

  return card.getCardElement();
}

const renderCard = (data) => {
  const cardElement = createCard(data);

  cardsContainer.prepend(cardElement);
}

// OPEN EVENT LISTENERS
// EDIT PROFILE
editProfileButton.addEventListener('click', () => {
  editProfileFormValidator.resetValidation();
const userData = userInfo.getUserInfo();
  // const name = document.querySelector('.profile__name');
  // const job = document.querySelector('.profile__profession'); ==================================================LAST SESSION==============================

  profileNameInput.value = userData.name;
  profileJobInput.value = userData.job;

  editProfileModal.open();
});

// ADD CARD
addCardButton.addEventListener('click', () => {
  addCardForm.reset();

  addCardFormValidator.resetValidation();

  addCardModal.open();
});

// GENERATE CARDS
initialCards.forEach(card => renderCard(card));
// <=====