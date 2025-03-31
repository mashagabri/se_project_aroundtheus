import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, submitButtonSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButtonSelector = submitButtonSelector;
    this._button = this._popupForm.querySelector(this._submitButtonSelector);
    this._textButton = this._button.textContent;
    this._bindSubmit = (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    };
    this._inputs = Array.from(this._popupForm.querySelectorAll("input"));
  }

  reset() {
    this._popupForm.reset();
  }

  //collects data from all the input fields and returns it as an object
  _getInputValues() {
    const result = {};
    this._inputs.forEach((input) => {
      result[input.name] = input.value;
    });
    return result;
  }

  open() {
    super.open();
    this._popupForm.addEventListener("submit", this._bindSubmit);
  }

  // showLoadingButton() {
  //   this._button.innerText = this._textLoadingButton + "...";
  // }

  // showButton() {
  //   this._button.innerText = this._textButton;
  // }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._button.textContent = loadingText;
    } else {
      this._button.textContent = this._textButton;
    }
  }

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._bindSubmit);
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      // Here you insert the `value` by the `name` of the input
      input.value = data[input.name];
    });
  }

  getFormId() {
    return this._popupForm.id;
  }
}
