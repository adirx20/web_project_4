// =====>
const customFetch = (url, headers) =>
  fetch(url, headers)
    .then((res) => res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`))
    .catch((err) => console.log(err))

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

  getUserInfo() {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  }

  createCard(data) {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "7d25a2aa-7d8e-4eaa-a0f4-d0c8a249fbe0",
    "Content-Type": "application/json"
  }
});
// <=====

export { api };

  // Token: 7d25a2aa-7d8e-4eaa-a0f4-d0c8a249fbe0 Group ID: group-12