//To render all cards and where to put every single card

export default class Section {
  constructor({ items, renderer }, cardsContainerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(cardsContainerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }
}
