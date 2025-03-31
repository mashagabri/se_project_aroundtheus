export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteButton,
    handleLikeButton
  ) {
    // constructor({name,link}, cardSelector, handleImageClick) {
    this.name = data.name;
    this.link = data.link;
    this.isLiked = data.isLiked;
    this.id = data._id;

    // cardSelector is for choosing which template to use
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    // handleImageClick will handle how to open a picture modal
    // this.getCardElement = getCardElement;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeButton = handleLikeButton;
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
      this._handleLikeButton(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton(this);
    });

    this._cardImage.addEventListener("click", () => {
      // Открываем изображение
      this._handleImageClick(this);
    });
  }

  toggleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
    this.isLiked = !this.isLiked;
  }

  deleteCardFromInterface() {
    // Удаляем карточку из DOM
    console.log(this);
    this._element.remove();
    // this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate(); // Получаем шаблон карточки
    console.log(this._element);
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    if (this.isLiked) {
      this._likeButton.classList.toggle("card__like-button_active");
    }
    // Заполняем карточку данными
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardTitle.textContent = this.name;

    // Добавляем обработчики событий
    this._setEventListeners();
    return this._element; // Возвращаем готовую карточку
  }
}
