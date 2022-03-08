import './index.css';
import FormValidator from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { api } from '../utils/Api.js';

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
const editProfileModalElement = document.querySelector('.popup_type_edit-profile');
const editAvatarModalElement = document.querySelector('.popup_type_edit-avatar');
const addCardModalElement = document.querySelector('.popup_type_add-card');
const avatarElement = document.querySelector('.profile__avatar');
const cardTemplateSelector = '.card-template';

// OPEN BUTTONS
const editProfileButton = document.querySelector('.profile__edit-button');
const editAvatarButton = document.querySelector('.profile__avatar-button');
const addCardButton = document.querySelector('.profile__add-button');

// INPUTS 
const profileNameInput = document.querySelector('.form__input_type_name');
const profileJobInput = document.querySelector('.form__input_type_profession');

// FORMS
const editProfileForm = editProfileModalElement.querySelector('.form');
const editAvatarForm = editAvatarModalElement.querySelector('.form');
const addCardForm = addCardModalElement.querySelector('.form');

// VALIDATORS
const editProfileFormValidator = new FormValidator(settings, editProfileForm);
const editAvatarFormValidator = new FormValidator(settings, editAvatarForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);

// CALL FORMS VALIDATON
editProfileFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// GET INITIAL CARDS AND USER INFO
let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, userData]) => {
    userId = userData._id;

    section.render(cardData);

    userInfo.setUserInfo({ name: userData.name, about: userData.about })

    editAvatar(userData.avatar);
  })
  .catch(err => console.log(`Error: ${err}`))

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
    handleLikeIcon: (id) => {
      const isAlreadyLiked = card.isLiked();

      if (isAlreadyLiked) {
        api.unlikeCard(id)
        .then(res => {
          card.likeCard(res.likes);
        })
        .catch(err => console.log(`Error: ${err}`))
        // remove like
      } else {
        api.likeCard(id)
          .then(res => {
            card.likeCard(res.likes);
          })
          .catch(err => console.log(`Error: ${err}`))
      }
    },
    handleDeleteCard: (id) => {
      confirmModal.open();

      confirmModal.setAction(() => {
        api.deleteCard(id)
          .then(res => {
            card.removeCard();
            confirmModal.close();
          })
          .catch(err => console.log(`Error: ${err}`))
      })
    }
  }, cardTemplateSelector, userId);

  section.addItem(card.getCardElement());
}

// EDIT AVATAR FUNCTION
function editAvatar(data) {
  avatarElement.style.backgroundImage = `url(${data})`;
}

// FORMS FUNCTIONS
function renderLoading(button, isLoading) {
  if (isLoading) {
    button.querySelector('.form__save-button').textContent = 'Saving...';
  } else {
    button.querySelector('.form__save-button').textContent = 'Save';
  }
}

// MODALS
// DELETE CARD
const confirmModal = new PopupWithSubmit('.popup_type_delete-card');
confirmModal.setEventListeners();

// IMAGE
const imageModal = new PopupWithImage('.popup_type_image');
imageModal.setEventListeners();

// EDIT PROFILE
const editProfileModal = new PopupWithForm('.popup_type_edit-profile', (data) => {
  renderLoading(editProfileModalElement, true);

  api.editProfile(data)
  .then(res => {
    userInfo.setUserInfo(res);
    editProfileModal.close();
  })
  .catch(err => console.log(`Error: ${err}`))
  .finally(() => renderLoading(editProfileModalElement, false))
  })

editProfileModal.setEventListeners();

// EDIT AVATAR
const editAvatarModal = new PopupWithForm('.popup_type_edit-avatar', (data) => {
  renderLoading(editAvatarModalElement, true);

  api.editAvatar(data)
  .then(data => {
    editAvatar(data.avatar);
    editAvatarModal.close();
  })
  .catch(err => console.log(`Error: ${err}`))
  .finally(() => renderLoading(editAvatarModalElement, false))
})
editAvatarModal.setEventListeners();

// ADD CARD
const addCardModal = new PopupWithForm('.popup_type_add-card', (data) => {
  renderLoading(addCardModalElement, true);

  api.createCard(data)
    .then(res => {
      createCard(res);
      addCardModal.close();
    })
    .catch(err => console.log(`Error: ${err}`))
    .finally(() => renderLoading(addCardModalElement, false))
});
addCardModal.setEventListeners();

// OPEN BUTTONS EVENT LISTENERS
// EDIT PROFILE
editProfileButton.addEventListener('click', () => {
  editProfileFormValidator.resetValidation();
  const userData = userInfo.getUserInfo();

  profileNameInput.value = userData.name;
  profileJobInput.value = userData.about;

  editProfileModal.open();
});

// EDIT AVATAR
editAvatarButton.addEventListener('click', () => {
  editAvatarForm.reset();

  editAvatarFormValidator.resetValidation();

  editAvatarModal.open();
})

// ADD CARD
addCardButton.addEventListener('click', () => {
  addCardForm.reset();

  addCardFormValidator.resetValidation();

  addCardModal.open();
});
// <=====