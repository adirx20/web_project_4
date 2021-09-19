const enableValidation = (settings) => {
    const forms = [...document.querySelectorAll('.form')];

    console.log(forms);

    forms.forEach( form => {
      form.addEventListener('submit', evt => {
        evt.preventDefault();
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

const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  };

  enableValidation(config);