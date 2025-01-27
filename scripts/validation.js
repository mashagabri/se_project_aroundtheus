const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
  errorClassVisible: "modal__error_visible",
};

// ----------------------Functions----------------------- //

function setEventListeners() {}

function checkInputValidity(input) {
  if (!input.validity.valid) {
    showError(input);
    return false;
  } else {
    hideError(input);
    return true;
  }
}

function showError(input) {
  //add class of the input with red border
  const idError = `${input.id}-error`;
  // const idError = input.id + "-error";
  // const errorField = document.querySelector(`#${idError}`);
  const errorSpan = document.getElementById(idError);
  // const errorField = input.closest(config.errorClass);
  //find every input id with + error
  input.classList.add(config.inputErrorClass);
  errorSpan.innerText = input.validationMessage;
  errorSpan.classList.add(config.errorClassVisible);
}

function hideError(input) {
  const idError = `${input.id}-error`;
  const errorSpan = document.getElementById(idError);
  input.classList.remove(config.inputErrorClass);
  errorSpan.innerText = "";
  errorSpan.classList.remove(config.errorClassVisible);
}

function disableButton(button) {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
}

function enableButton(button) {
  button.disabled = false;
  button.classList.remove(config.inactiveButtonClass);
}

function enableValidation(config) {
  const forms = [...document.querySelectorAll(config.formSelector)];
  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (inputs.every((input) => checkInputValidity(input))) {
          enableButton(button);
        } else {
          disableButton(button);
        }
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let toggleButton = true;
      inputs.forEach((input) => {
        if (!checkInputValidity(input)) {
          showError(input);
          toggleButton = false;
          disableButton(button);
        }
      });
      if (toggleButton) {
        enableButton(button);
        e.target.reset();
      }
    });
  });
}

enableValidation(config);
