export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }

  // Метод получения информации о пользователе
  getUserInfo() {
    return {
      name: this._nameElement.innerText,
      about: this._aboutElement.innerText,
    };
  }

  // Метод установки новой информации о пользователе
  setUserInfo(data) {
    this._nameElement.innerText = data.name;
    this._aboutElement.innerText = data.about;
  }
}
