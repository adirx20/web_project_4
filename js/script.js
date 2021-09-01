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
const editProfileModal = document.querySelector('.popup_type_edit-profile');
const addCardModal = document.querySelector('.popup_type_add-card');

// close buttons
const editProfileModalCloseButton = editProfileModal.querySelector('.popup__close-button');
const addCardModalCloseButton = addCardModal.querySelector('.popup__close-button');

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

// Modal toggle function
function toggleModal(modal) {
    modal.classList.toggle('popup_opened');
}

// 'Edit Profile' event listeners
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

// 'Add Card' event listeners
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

    cardsContainer.append(cardElement);
};

initialCards.forEach(generateCard);









// let modal = document.querySelector('.popup');
// let formElement = document.querySelector('.form');
// let saveButton = document.querySelector('.form__save-button');
// let closeButton = document.querySelector('.popup__close-button');
// let editButton = document.querySelector('.profile__edit-button');
// let nameInput = formElement.querySelector('.form__input_type_name');
// let jobInput = formElement.querySelector('.form__input_type_profession');
// let name = document.querySelector('.profile__name');
// let job = document.querySelector('.profile__profession');

// function modalOpen() {
//     nameInput.value = name.textContent;
//     jobInput.value = job.textContent;
    
//     modal.classList.add('popup_opened');
// }

// function modalClose() {
//     modal.classList.remove('popup_opened');
// }
// //

// // submitting the form --->
// function handleFormSubmit(evt) {
//     evt.preventDefault();
    
//     name.textContent = nameInput.value;
//     job.textContent = jobInput.value;
//     modalClose();
// }

// editButton.addEventListener('click', modalOpen);
// closeButton.addEventListener('click', modalClose);
// formElement.addEventListener('submit', handleFormSubmit);
// //