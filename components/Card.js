export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    // constructor({name,link}, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    // cardSelector is for choosing which template to use
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    // handleImageClick will handle how to open a picture modal
    // this.getCardElement = getCardElement;
  }

  // Так как карточка создаётся на основе шаблона, нужно клонировать его содержимое
  _getTemplate() {
    // Находим <template>
    const cardElement = document
      .querySelector(this._cardSelector)
      // Находим сам элемент карточки внутри него. Клонируем карточку
      // cloneNode делает глубокое копирование, включая все дочерние элементы
      .content.querySelector(".card")
      .cloneNode(true);
    //Возвращаем клонированную карточку
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      // Добавляем или убираем лайк
      this._likeButton.classList.toggle("card__like-button_active");
    });

    this._deleteButton.addEventListener("click", () => {
      // Удаляем карточку из DOM
      this._element.remove();
      this._element = null;
    });

    this._cardImage.addEventListener("click", () => {
      // Открываем изображение
      this._handleImageClick(this);
    });
  }

  generateCard() {
    this._element = this._getTemplate(); // Получаем шаблон карточки
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    // Заполняем карточку данными
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    // Добавляем обработчики событий
    this._setEventListeners();

    return this._element; // Возвращаем готовую карточку
  }
}
