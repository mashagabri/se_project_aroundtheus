import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    handleFormSubmit,
    textButton,
    textLoadingButton,
    submitButtonSelector
  ) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._textButton = textButton;
    this._textLoadingButton = textLoadingButton;
    this._submitButtonSelector = submitButtonSelector;
    this._button = this._popupForm.querySelector(this._submitButtonSelector);
  }

  //collects data from all the input fields and returns it as an object
  _getInputValues() {
    const listOfInputs = Array.from(this._popupForm.querySelectorAll("input"));
    const result = {};
    listOfInputs.forEach((input) => {
      result[input.name] = input.value;
    });
    return result;
  }

  setEventListeners() {
    super.setEventListeners(); // Вызов родительского метода
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._popupForm.reset();
    });
  }

  showLoadingButton() {
    this._button.innerText = this._textLoadingButton + "...";
  }

  showButton() {
    this._button.innerText = this._textButton;
  }
}
