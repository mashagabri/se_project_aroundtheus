export default class UserInfo {
  constructor({ nameSelector, aboutSelector, pictureSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._profilePicture = document.querySelector(pictureSelector);
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
    this._profilePicture.src = data.avatar;
    this._nameElement.innerText = data.name;
    this._aboutElement.innerText = data.about;
  }
}
