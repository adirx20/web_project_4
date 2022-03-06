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
const editAvatarModalSelector = document.querySelector('.popup_type_edit-avatar');
const addCardModalSelector = document.querySelector('.popup_type_add-card');
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
    console.log('cardData:', cardData);
    section.render(cardData);

    userInfo.setUserInfo({ name: userData.name, about: userData.about })
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
    handleLikeIcon: (id) => {
      const isAlreadyLiked = card.isLiked();

      if (isAlreadyLiked) {
        console.log(data)
        api.unlikeCard(id)
        .then(res => {
          card.likeCard(res.likes);
          console.log('res', res, res.likes);
        })
        // remove like
      } else {
        console.log('should like')
        api.likeCard(id)
          .then(res => {
            card.likeCard(res.likes);
            console.log('res', res, res.likes);
          })
      }
    },
    handleDeleteCard: (id) => {
      confirmModal.open();

      confirmModal.setAction(() => {
        api.deleteCard(id)
          .then(res => {
            console.log('card is deleted!!!', res, id);
            card.removeCard();
            confirmModal.close();
          })
      })
    }
  }, cardTemplateSelector, userId);

  section.addItem(card.getCardElement());
}

// EDIT AVATAR FUNCTION
function editAvatar(data) {
  const avatarSelector = document.querySelector('.profile__avatar');
  avatarSelector.style.backgroundImage = `url(${data})`; // IT SHOULDNT BE THE BUTTON!!!
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
  console.log('hello', data);

  api.editProfile(data)
  .then(res => {
    console.log('res', res);
    userInfo.setUserInfo(res);
  })
  })

editProfileModal.setEventListeners();

// EDIT AVATAR
const editAvatarModal = new PopupWithForm('.popup_type_edit-avatar', (data) => {
  console.log('data', data);
  api.editAvatar(data)
  .then(res => {
    console.log('res', res); // NEED TO TAKE CARE OF CONNECTING THE URL TO THE BUTTON
    editAvatar(res.avatar);
  })
})
editAvatarModal.setEventListeners();

// ADD CARD
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