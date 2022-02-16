import './index.css';
import FormValidator from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { api } from '../components/Api.js';

// =====>
// SETTINGS
const settings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_theme_error',
  errorClass: "popup__error_visible"
};

// SELECTORS
const editProfileModalSelector = document.querySelector('.popup_type_edit-profile');
const addCardModalSelector = document.querySelector('.popup_type_add-card');
const cardTemplateSelector = '.card-template';

// OPEN BUTTONS
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// INPUTS 
const profileNameInput = document.querySelector('.form__input_type_name');
const profileJobInput = document.querySelector('.form__input_type_profession');

// FORMS
const editProfileForm = editProfileModalSelector.querySelector('.form');
const addCardForm = addCardModalSelector.querySelector('.form');

// // CREATE AND RENDER CARD
// const createCard = (data) => {
//   const card = new Card(data,
//     (text, link) => {
//     imageModal.open(text, link);
//   }, cardTemplateSelector);
//   return card.getCardElement();
// }

// VALIDATORS
const editProfileFormValidator = new FormValidator(settings, editProfileForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);

// CALL FORMS VALIDATON
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// API
api.getInitialCards()
  .then((res) => {
    section.render(res);
    console.log(res);
  })

api.getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({ name: res.name, profession: res.about });
    console.log('res:', res);
  })

// USER INFO
const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileJobSelector: '.profile__profession'
});

// SECTION
const section = new Section({
  renderer: (data) => {
    createCard(data);
  }
}, '.elements');

function createCard(data) {
  const card = new Card({
    data,
    handleCardClick: () => {
      imageModal.open(data.name, data.link);
    },
    handleDeleteCard: () => {
      console.log('1234');
    }
  }, cardTemplateSelector);

  section.addItem(card.getCardElement());
}

// MODALS
const imageModal = new PopupWithImage('.popup_type_image');
imageModal.setEventListeners();

const editProfileModal = new PopupWithForm('.popup_type_edit-profile', data => userInfo.setUserInfo(data));
editProfileModal.setEventListeners();

const addCardModal = new PopupWithForm('.popup_type_add-card', (data) => {

  api.createCard(data)
    .then(res => {
      createCard(res);
    })
});
addCardModal.setEventListeners();

// OPEN BUTTONS EVENT LISTENERS
// EDIT PROFILE
editProfileButton.addEventListener('click', () => {
  editProfileFormValidator.resetValidation();
  const userData = userInfo.getUserInfo();

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
// <=====