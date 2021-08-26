// opening and closing the popup --->
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.form');
let saveButton = document.querySelector('.form__save-button');
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
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', handleFormSubmit);
//


// using the like button (tried unsuccessfully) --->
// let likeButtons = document.querySelectorAll('.element__like-button');

// function likeActive(evt) {
//     evt.preventDefault();
    
//     likeButtons.classList.add('element__like-button_active');
// }

// for (i = 0; i < likeButtons.length; i++) {
//     let likeButton = likeButtons[i]
    
//     likeButton.addEventListener('click', likeActive);
// }
//