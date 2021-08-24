// opening and closing the popup --->
let popup = document.querySelector('.popup');

function popupOpen() {
    popup.classList.add('popup_opened');
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
//

// submitting the form --->
let formElement = document.querySelector('.form');

console.log(formElement.classList);

function handleFormSubmit(evt) {
    evt.preventDefault();

    let nameInput = formElement.querySelector('.form__input_type_name');
    let jobInput = formElement.querySelector('.form__input_type_profession');
}

handleFormSubmit();

let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__profession');
let saveButton = document.querySelector('.form__save-button');

// let likeButton = document.querySelectorAll('.element__like-button');
// for (i = 0; i < likeButton.length; i++) {
//     likeButton[i].addEventListener('click', addClass);
// }