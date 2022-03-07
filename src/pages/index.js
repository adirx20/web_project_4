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
const editProfileModalSelector = document.querySelector('.popup_type_edit-profile');
const editAvatarModalSelector = document.querySelector('.popup_type_edit-avatar');
const addCardModalSelector = document.querySelector('.popup_type_add-card');
const avatarSelector = document.querySelector('.profile__avatar');
const cardTemplateSelector = '.card-template';

// OPEN BUTTONS
const editProfileButton = document.querySelector('.profile__edit-button');
const editAvatarButton = document.querySelector('.profile__avatar-button');
const addCardButton = document.querySelector('.profile__add-button');

// INPUTS 
const profileNameInput = document.querySelector('.form__input_type_name');
const profileJobInput = document.querySelector('.form__input_type_profession');

// FORMS
const editProfileForm = editProfileModalSelector.querySelector('.form');
const editAvatarForm = editAvatarModalSelector.querySelector('.form');
const addCardForm = addCardModalSelector.querySelector('.form');

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

    renderAvatar(userData.avatar);
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
  avatarSelector.style.backgroundImage = `url(${data})`;
}

function renderAvatar(data) {
  avatarSelector.style.backgroundImage = `url(${data})`
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

  api.editProfile(data)
  .then(res => {
    userInfo.setUserInfo(res);
    editProfileModal.close();
  })
  .catch(err => console.log(`Error: ${err}`))
  })

editProfileModal.setEventListeners();

// EDIT AVATAR
const editAvatarModal = new PopupWithForm('.popup_type_edit-avatar', (data) => {
  api.editAvatar(data)
  .then(data => {
    editAvatar(data.avatar);
    editAvatarModal.close();
  })
  .catch(err => console.log(`Error: ${err}`))
  .finally(editAvatarModalSelector.querySelector('.form__save-button').textContent = 'Saving...')
})
editAvatarModal.setEventListeners();

// ADD CARD
const addCardModal = new PopupWithForm('.popup_type_add-card', (data) => {

  api.createCard(data)
    .then(res => {
      createCard(res);
      addCardModal.close();
    })
    .catch(err => console.log(`Error: ${err}`))
    .finally(addCardModalSelector.querySelector('.form__save-button').textContent = 'Saving...')
});
addCardModal.setEventListeners();

// OPEN BUTTONS EVENT LISTENERS
// EDIT PROFILE
editProfileButton.addEventListener('click', () => {
  editProfileFormValidator.resetValidation();
  const userData = userInfo.getUserInfo();

  profileNameInput.value = userData.name;
  profileJobInput.value = userData.about;

  editProfileModalSelector.querySelector('.form__save-button').textContent = 'Save';

  editProfileModal.open();
});

// EDIT AVATAR
editAvatarButton.addEventListener('click', () => {
  editAvatarForm.reset();

  editAvatarFormValidator.resetValidation();

  editAvatarModalSelector.querySelector('.form__save-button').textContent = 'Save';

  editAvatarModal.open();
})

// ADD CARD
addCardButton.addEventListener('click', () => {
  addCardForm.reset();

  addCardFormValidator.resetValidation();

  addCardModalSelector.querySelector('.form__save-button').textContent = 'Save';

  addCardModal.open();
});
// <=====