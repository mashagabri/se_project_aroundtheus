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
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);
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
      return false;
    }
    return true;
  }

  _disableButton() {
    this._button.disabled = true;
    this._button.classList.add(this._inactiveButtonClass);
  }

  _enableButton() {
    this._button.disabled = false;
    this._button.classList.remove(this._inactiveButtonClass);
  }

  _setEventListeners() {
    this._disableButton();
    this._inputs.forEach((input1) => {
      input1.addEventListener("input", () => {
        if (!this._checkInputValidity(input1)) {
          this._showError(input1);
        } else {
          this._hideError(input1);
        }
        if (this._inputs.every((input2) => this._checkInputValidity(input2))) {
          this._enableButton();
        } else {
          this._disableButton();
        }
      });
    }, this);
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputs.forEach((input) => this._hideError(input));
    this._disableButton();
  }
}
