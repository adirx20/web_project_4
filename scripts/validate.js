// show and hide error functions
const showError = (input) => {
  const errorElement = document.querySelector(`#${input.id}-error`);
  const errorMessage = input.validationMessage;

  errorElement.textContent = errorMessage;
}

const hideError = (input) => {
  const errorElement = document.querySelector(`#${input.id}-error`);

  errorElement.textContent = '';
}

// check validity function
const checkValidity = (input) => {
  if (input.validity.valid) {
    hideError(input);
  }
  else {
    showError(input);
  }
}

// enable validation function
const enableValidation = (settings) => {
    const forms = [...document.querySelectorAll('.form')];

    console.log(forms);

    forms.forEach( form => {
      form.addEventListener('submit', evt => {
        evt.preventDefault();
      });

      const inputs = [...form.querySelectorAll('.form__input')];

      inputs.forEach( input => {
        input.addEventListener('input', () => {
          checkValidity(input);
          // check validity
          // toggleButtonState
        });
      });
    });

    // find all forms
      // prevent their default behaivor
      // search for all inputs inside the form
        // subscribe to his change
          // check if input is valid
          // if its valid active button
            //  if no => show error => default browser message for input
}

// settings list
const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  };

  enableValidation(config);