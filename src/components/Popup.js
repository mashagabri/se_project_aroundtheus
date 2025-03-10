export default class Popup {
  constructor(popupSelector) {
    this._bindHandler = (event) => {
      this._handleEscButton(event);
    };
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._bindHandler);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._bindHandler);
  }

  _handleEscButton(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener(
      "click",
      (event) => {
        if (
          event.target === this._popupElement ||
          event.target === this._closeButton
        ) {
          this.close();
        }
      },
      this
    );
  }
}
