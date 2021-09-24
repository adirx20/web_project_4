// settings list
const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_theme_error',
  errorClass: "popup__error_visible"
};

// functions
// -----
// show and hide error functions
const showError = (input, settings) => {
  const errorElement = document.querySelector(`#${input.id}-error`);
  const errorMessage = input.validationMessage;
  
  errorElement.textContent = errorMessage;
  input.classList.add(settings.inputErrorClass);
}

const hideError = (input, settings) => {
  const errorElement = document.querySelector(`#${input.id}-error`);
  
  errorElement.textContent = '';
  input.classList.remove(settings.inputErrorClass);
}

// toggle button state function
const toggleButtonState = (inputs, button, settings) => {
  const isValid = inputs.every( input => input.validity.valid );

  if (isValid) {
    button.disabled = false;
    button.classList.remove(settings.inactiveButtonClass);
  }
  else {
    button.disabled = 'disabled';
    button.classList.add(settings.inactiveButtonClass);
  }
}

// check validity function
const checkValidity = (input, settings) => {
  if (input.validity.valid) {
    hideError(input, settings);
  }
  else {
    showError(input, settings);
  }
}

// enable validation function
const enableValidation = (settings) => {
    const forms = [...document.querySelectorAll(settings.formSelector)];

    forms.forEach( form => {
      form.addEventListener('submit', evt => {
        evt.preventDefault();
      });

      const inputs = [...form.querySelectorAll(settings.inputSelector)];
      const button = form.querySelector(settings.submitButtonSelector);
      
      toggleButtonState(inputs, button, settings);
      
      inputs.forEach( input => {
        input.addEventListener('input', () => {
          checkValidity(input, settings);
          toggleButtonState(inputs, button, settings);
        });
      });
    });
}



  enableValidation(config);