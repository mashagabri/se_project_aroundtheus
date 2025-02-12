// ----------------------Functions----------------------- //

// function setEventListeners(form, config) {
//   const { inputSelector } = config;
//   const { submitButtonSelector } = config;
//   const inputs = Array.from(form.querySelectorAll(inputSelector));
//   const button = form.querySelector(submitButtonSelector);
//   disableButton(button, config);
//   inputs.forEach((input) => {
//     input.addEventListener("input", () => {
//       if (inputs.every((input) => checkInputValidity(input, config))) {
//         enableButton(button, config);
//       } else {
//         disableButton(button, config);
//       }
//     });
//   });

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     //Left this field because when we open "create card" if user
//     //press the button create then he can create this card even with
//     //empty fields. He didn't click on any input.
//     let toggleButton = true;
//     inputs.forEach((input) => {
//       if (!checkInputValidity(input, config)) {
//         showError(input, config);
//         toggleButton = false;
//         disableButton(button, config);
//       }
//     });
//     console.log("submit" + toggleButton);
//     if (toggleButton) {
//       enableButton(button, config);
//       e.target.reset();
//     }
//   });
// }

// function showError(input, config) {
//   const { errorClassVisible } = config;
//   const { inputErrorClass } = config;
//   //add class of the input with red border
//   const idError = `${input.id}-error`;
//   // const idError = input.id + "-error";
//   // const errorField = document.querySelector(`#${idError}`);
//   const errorSpan = document.getElementById(idError);
//   // const errorField = input.closest(config.errorClass);
//   //find every input id with + error
//   input.classList.add(inputErrorClass);
//   errorSpan.innerText = input.validationMessage;
//   errorSpan.classList.add(errorClassVisible);
// }

// function hideError(input, config) {
//   const { errorClassVisible } = config;
//   const { inputErrorClass } = config;
//   const idError = `${input.id}-error`;
//   const errorSpan = document.getElementById(idError);
//   input.classList.remove(inputErrorClass);
//   errorSpan.innerText = "";
//   errorSpan.classList.remove(errorClassVisible);
// }

// function disableButton(button, config) {
//   const { inactiveButtonClass } = config;
//   button.disabled = true;
//   button.classList.add(inactiveButtonClass);
// }

// function enableButton(button, config) {
//   const { inactiveButtonClass } = config;
//   button.disabled = false;
//   button.classList.remove(inactiveButtonClass);
// }

// function enableValidation(config) {
//   const { formSelector } = config;
//   const forms = [...document.querySelectorAll(formSelector)];
//   forms.forEach((form) => {
//     setEventListeners(form, config);
//   });
// }

// enableValidation(config);
