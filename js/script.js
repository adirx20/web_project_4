// Cards
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

initialCards.forEach( cardData => {
    console.log('cardData', cardData);

    const cardElement = cardItem.cloneNode(true);
    const title = cardElement.querySelector('.element__title');
    const image = cardElement.querySelector('.element__image');

    title.textContent = cardData.name;
    image.src = `${cardData.link}`;
    cardsContainer.append(cardElement);
});










let popup = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let saveButton = document.querySelector('.form__save-button');
let closeButton = document.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__edit-button');
let nameInput = formElement.querySelector('.form__input_type_name');
let jobInput = formElement.querySelector('.form__input_type_profession');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__profession');

function popupOpen() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    
    popup.classList.add('popup_opened');
}

function popupClose() {
    popup.classList.remove('popup_opened');
}
//

// submitting the form --->
function handleFormSubmit(evt) {
    evt.preventDefault();
    
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupClose();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', handleFormSubmit);
//