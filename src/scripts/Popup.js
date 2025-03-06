export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", (event) => {
      this._handleEscButton(event);
    });
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", (event) => {
      this._handleEscButton(event);
    });
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
