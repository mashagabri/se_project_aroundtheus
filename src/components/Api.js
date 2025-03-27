export default class Api {
  #token;
  #contentType;
  #baseUrl;
  constructor(options) {
    this.#token = options.headers.authorization;
    this.#contentType = options.headers["Content-Type"];
    this.#baseUrl = options.baseUrl;
  }

  async getInitialCards() {
    return await fetch(`${this.#baseUrl}/cards`, {
      headers: {
        authorization: this.#token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
    // .catch;
  }

  async getUserInfo() {
    return await fetch(`${this.#baseUrl}/users/me`, {
      headers: {
        authorization: this.#token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  async editUserInfo(userName, userAbout) {
    return await fetch(`${this.#baseUrl}/users/me`, {
      headers: {
        authorization: this.#token,
        "Content-type": this.#contentType,
      },
      method: "PATCH",
      body: JSON.stringify({
        name: userName,
        about: userAbout,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  async addNewCard(cardName, cardLink) {
    return await fetch(`${this.#baseUrl}/cards`, {
      headers: {
        authorization: this.#token,
        "Content-type": this.#contentType,
      },
      method: "POST",
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}`);
    });
  }

  async deleteCard(idCard) {
    return await fetch(
      // "https://around-api.en.tripleten-services.com/v1/cards/" + idCard,
      `${this.#baseUrl}/cards/${idCard}`,
      {
        headers: {
          authorization: this.#token,
        },
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}: card wasn't deleted`);
    });
  }

  getPromiseAll() {
    return Promise.all([getInitialCards()]);
  }

  async addLike(idCard) {
    return await fetch(`${this.#baseUrl}/cards/${idCard}/likes`, {
      headers: {
        authorization: this.#token,
      },
      method: "PUT",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}: like wasn't added`);
    });
  }

  async removeLike(idCard) {
    return await fetch(`${this.#baseUrl}/cards/${idCard}/likes`, {
      headers: {
        authorization: this.#token,
      },
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}: like wasn't added`);
    });
  }

  async updateProfilePicture(linkAvatar) {
    return await fetch(`${this.#baseUrl}/users/me/avatar`, {
      headers: {
        authorization: this.#token,
        "Content-type": this.#contentType,
      },
      method: "PATCH",
      body: JSON.stringify({
        avatar: linkAvatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}: picture wasn't added`);
    });
  }
}
