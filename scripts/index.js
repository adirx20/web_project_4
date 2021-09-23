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

// image modal elements
const imageModalImage = document.querySelector('.popup__image');
const imageModalCaption = document.querySelector('.popup__caption');

// functions
// -----
// close popup by pressing 'escape'
function modalKeyClose(evt) {
  if (evt.key === 'Escape') {
    modals.forEach( modal => {
      modal.classList.remove('popup_opened');
    });
  }
}

// modal close when clicking outside the popup
function modalClickOutside(evt) {
  modals.forEach( modal => {
    if (evt.target.classList.contains('popup')) {
      document.addEventListener('click', () => {
        modal.classList.remove('popup_opened');
      })
    }
  });
}

// modal toggle function
function toggleModal(modal) {
    modal.classList.toggle('popup_opened');

    if (modal.classList.contains('popup_opened')) {
      document.addEventListener('keydown', modalKeyClose)
      document.addEventListener('click', modalClickOutside);
    }
}

// handle form submit function
function handleFormSubmit(evt) {
  evt.preventDefault();

  const name = document.querySelector('.profile__name');
  const job = document.querySelector('.profile__profession');
  
  name.textContent = profileNameInput.value;
  job.textContent = profileJobInput.value;
  toggleModal(editProfileModal);
}

// generate cards function
function generateCard(cardData) {
  const cardElement = cardItem.cloneNode(true);

  const title = cardElement.querySelector('.element__title');
  const image = cardElement.querySelector('.element__image');
  const deleteButton = cardElement.querySelector('.element__delete-button');
  const likeButton = cardElement.querySelector('.element__like-button');

  title.textContent = cardData.name;
  image.style.backgroundImage = `url(${cardData.link})`;

  likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('element__like-button_active');
  });

  deleteButton.addEventListener('click', () => {
      cardElement.remove();
  });

  image.addEventListener('click', () => {
    toggleModal(imageModal);

    imageModalImage.src = cardData.link;
    imageModalCaption.textContent = cardData.name;
  });

  cardsContainer.append(cardElement);
};

// 'edit profile' modal event listeners
editProfileButton.addEventListener('click', () => {
    const name = document.querySelector('.profile__name');
    const job = document.querySelector('.profile__profession');

    profileNameInput.value = name.textContent;
    profileJobInput.value = job.textContent;
    toggleModal(editProfileModal);
});

editProfileModalCloseButton.addEventListener('click', () => {
    toggleModal(editProfileModal);
});

formElement.addEventListener('submit', handleFormSubmit);

// 'add card' modal event listeners
addCardButton.addEventListener('click', () => {
    addCardForm.reset();
    toggleModal(addCardModal);
});

addCardModalCloseButton.addEventListener('click', () => {
    toggleModal(addCardModal);
});

addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    generateCard({name: cardTitleInput.value, link: cardLinkInput.value});

    toggleModal(addCardModal);
})

// 'image' modal event listeners
imageModalCloseButton.addEventListener('click', () => {
  toggleModal(imageModal);
});

// generate cards
initialCards.forEach(generateCard);