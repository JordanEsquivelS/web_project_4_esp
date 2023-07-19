class Api {
  constructor(options) {
    this.options = options;
    this.headers = {
      authorization: "6b6ff122-c6bd-4191-9431-3243f5375a43",
      "Content-Type": "application/json",
    };
  }

  fetchData(url, method = "GET", body = null) {
    console.log("URL de solicitud:", url);
    console.log("Método:", method);
    console.log("Cuerpo:", body);

    const requestOptions = {
      method: method,
      headers: this.headers,
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    console.log("Opciones de solicitud:", requestOptions); // Agregar esta línea
    return fetch(url, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log("Error en la respuesta del servidor:", res.status);
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserInfo(endPoint) {
    return this.fetchData(`${this.options}/${endPoint}`).then((result) => {
      return result;
    });
  }
  editUserInfo(nameInput, aboutMeInput, endPoint) {
    console.log("editUserInfo se está ejecutando");
    const body = {
      name: nameInput,
      about: aboutMeInput,
    };

    return this.fetchData(`${this.options}/${endPoint}`, "PATCH", body).then(
      (result) => {
        return result;
      }
    );
  }
  editUserPicture(profilePictureInput, endPoint) {
    const body = { avatar: profilePictureInput }; // Crea un objeto con la propiedad "avatar" y su valor

    return this.fetchData(`${this.options}/${endPoint}`, "PATCH", body).then(
      (result) => {
        return result;
      }
    );
  }

  getInitialCards(endPoint) {
    return this.fetchData(`${this.options}/${endPoint}`).then((result) => {
      return result;
    });
  }

  postNewCard(newCardNameInput, newCardLinkInput, endPoint) {
    const body = {
      name: newCardNameInput,
      link: newCardLinkInput,
    };

    return this.fetchData(`${this.options}/${endPoint}`, "POST", body).then(
      (result) => {
        return result;
      }
    );
  }

  deleteCard(endPoint) {
    return this.fetchData(`${this.options}/${endPoint}`, "DELETE").then(
      (result) => {
        return result;
      }
    );
  }

  likeCard(endPoint) {
    return this.fetchData(`${this.options}/${endPoint}`, "PUT").then(
      (result) => {
        return result;
      }
    );
  }

  deleteLike(endPoint) {
    return this.fetchData(`${this.options}/${endPoint}`, "DELETE").then(
      (result) => {
        return result;
      }
    );
  }
}

const apiInstance = new Api("https://around.nomoreparties.co/v1/web_es_07");

export default apiInstance;
