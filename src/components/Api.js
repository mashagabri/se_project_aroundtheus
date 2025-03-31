export default class Api {
  #token;
  #contentType;
  #baseUrl;
  constructor(options) {
    this.#token = options.headers.authorization;
    this.#contentType = options.headers["Content-Type"];
    this.#baseUrl = options.baseUrl;
  }

  async _request(endpoint, errorMessage, method = "GET", body = null) {
    return fetch(`${this.#baseUrl}${endpoint}`, {
      headers: {
        authorization: this.#token,
        "Content-Type": this.#contentType,
      },
      method: method,
      body: body,
    }).then((res) => {
      return this._checkResponse(res, errorMessage);
    });
  }

  async getInitialCards() {
    return this._request("/cards", "cards weren't got");
  }

  async getUserInfo() {
    return this._request("/users/me", "user info wasn't got");
  }

  async editUserInfo(userName, userAbout) {
    return this._request(
      "/users/me",
      "user info wasn't changed",
      "PATCH",
      JSON.stringify({
        name: userName,
        about: userAbout,
      })
    );
  }

  async addNewCard(cardName, cardLink) {
    return this._request(
      "/cards",
      "card wasn't added",
      "POST",
      JSON.stringify({
        name: cardName,
        link: cardLink,
      })
    );
  }

  async deleteCard(idCard) {
    return this._request(`/cards/${idCard}`, "card wasn't deleted", "DELETE");
  }

  getPromiseAll() {
    return Promise.all([getInitialCards()]);
  }

  async addLike(idCard) {
    return this._request(`/cards/${idCard}/likes`, "like wasn't added", "PUT");
  }

  async removeLike(idCard) {
    return this._request(
      `/cards/${idCard}/likes`,
      "like wasn't removed",
      "DELETE"
    );
  }

  async updateProfilePicture(linkAvatar) {
    return this._request(
      "/users/me/avatar",
      "picture wasn't added",
      "PATCH",
      JSON.stringify({
        avatar: linkAvatar,
      })
    );
  }

  _checkResponse(res, message) {
    if (res.ok) {
      return res.json();
    }
    const error = this.getError(res);
    error.then((data) => {
      return Promise.reject(
        `Error ${res.status}: ${message}, ${JSON.stringify(data)}`
      );
    });
  }

  getError(res) {
    return res.json();
  }
}
