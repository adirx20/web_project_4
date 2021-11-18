class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    getInitialCards() {
      // ...
    }
  
    // other methods for working with the API
  }
  
  const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-42",
    headers: {
      authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
      "Content-Type": "application/json"
    }
  });