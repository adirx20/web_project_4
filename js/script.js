let formElement = document.querySelector('.form');

console.log(formElement.classList);

function handleFormSubmit(evt) {
    evt.preventDefault();

    let nameInput = formElement.querySelector('.form__input_type_name');
    let jobInput = formElement.querySelector('.form__input_type_profession');
}

let popup = document.querySelector('.popup');

popup.classList.add('popup_opened');