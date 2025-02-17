export default class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._errorClassVisible = config.errorClassVisible;
    this._form = form;
  }

  _showError(input) {
    //add class of input with red border,find every input.id + "-error"
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.innerText = input.validationMessage;
    errorElement.classList.add(this._errorClassVisible);
  }

  _hideError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.innerText = "";
    errorElement.classList.remove(this._errorClassVisible);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      // this._showError(input);
      return false;
    }
    // this._hideError(input);
    return true;
  }

  _disableButton(button) {
    button.disabled = true;
    button.classList.add(this._inactiveButtonClass);
  }

  _enableButton(button) {
    button.disabled = false;
    button.classList.remove(this._inactiveButtonClass);
  }

  _setEventListeners() {
    const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    const button = this._form.querySelector(this._submitButtonSelector);
    this._disableButton(button);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (!this._checkInputValidity(input)) {
          this._showError(input);
        } else {
          this._hideError(input);
        }
        if (inputs.every((input) => this._checkInputValidity(input))) {
          this._enableButton(button);
        } else {
          this._disableButton(button);
        }
      });
    }, this);
    this._form.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
        //Left this field because when we open "create card" if user
        //press the button create then he can create this card even with
        //empty fields. He didn't click on any input.
        let toggleButton = true;
        inputs.forEach((input) => {
          if (!this._checkInputValidity(input)) {
            this._showError(input);
            toggleButton = false;
            this._disableButton(button);
          }
        }, this);
        console.log("submit" + toggleButton);
        if (toggleButton) {
          this._enableButton(button);
        }
      },
      this
    );
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    const button = this._form.querySelector(this._submitButtonSelector);
    inputs.forEach((input) => this._hideError(input));
    this._disableButton(button);
  }
}
