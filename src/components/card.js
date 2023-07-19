import apiInstance from "../components/api.js";
import Popup from "./popup.js";
import Section from "./section.js";
import { handleCardClick } from "../page/index.js";

let initialCards = [];

apiInstance
  .getInitialCards("/cards")
  .then((cards) => {
    initialCards = cards.map((card, index) => ({
      id: `card-${index}`,
      name: card.name,
      link: card.link,
      owner: card.owner, // Agrega la propiedad "owner" a cada tarjeta
      cardId: card._id, // Agrega el ID de la tarjeta
      likes: card.likes || [], // Agrega los likes de la tarjeta
    }));
    initialCards.reverse(); // Invertir el orden de los elementos
    // Configurar la sección de tarjetas después de recibir las imágenes del servidor
    const sectionOptions = {
      items: initialCards,
      renderer: (item) => {
        const card = new Card(item, handleCardClick);
        const cardElement = card.createCard();

        // Establecer el atributo data-card-id con el ID de la tarjeta
        cardElement.dataset.cardId = item.cardId;

        // Verificar si el propietario de la tarjeta coincide con tu ID de usuario
        if (item.owner._id === "881c7f60ed5326b0694b6b1a") {
          const deleteButton = cardElement.querySelector(".photo-grid__delete");
          deleteButton.style.display = "block";
          if (item.cardId) {
            card._configureDeleteEvent(cardElement, item.cardId); // Pasar el cardId correctamente
          }
        } else {
          const deleteButton = cardElement.querySelector(".photo-grid__delete");
          deleteButton.style.display = "none";
        }

        // Verificar si el usuario actual ha dado like a la tarjeta y actualizar el contador
        const likeButton = cardElement.querySelector(".photo-grid__like");
        const likeCounter = cardElement.querySelector(
          ".photo-grid__likeCounter"
        );
        if (item.likes && item.likes.includes("881c7f60ed5326b0694b6b1a")) {
          likeButton.classList.add("photo-grid__like_active");
        }
        if (item.likes && item.likes.length) {
          likeCounter.textContent = item.likes.length.toString();
        }

        section.addItem(cardElement);
      },
    };

    const section = new Section(sectionOptions, "#grid-container");
    section.render();
  })
  .catch((error) => {
    console.log("Error al obtener las tarjetas iniciales:", error);
  });

class Card {
  constructor(data, handleCardClick) {
    this.name = data.name;
    this.link = data.link;
    this.likes = data.likes || [];
    this.cardId = data.cardId;
    this._handleCardClick = handleCardClick;
    this._deleteConfirmationPopup = null;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector("#card-template")
      .content.querySelector(".photo-grid");
    return cardTemplate.cloneNode(true);
  }

  _setEventListeners(cardElement) {
    const likeButton = cardElement.querySelector(".photo-grid__like");

    likeButton.addEventListener("click", () => {
      this._handleLikeClick(likeButton, cardElement);
    });
  }

  _fillCardData(cardElement) {
    cardElement.querySelector(".photo-grid__image").src = this.link;
    cardElement.querySelector(".photo-grid__image").alt = this.name;
    cardElement.querySelector(".photo-grid__text").textContent = this.name;
  }

  _configureDeleteEvent(cardElement, cardId) {
    const deleteButton = cardElement.querySelector(".photo-grid__delete");
    deleteButton.addEventListener("click", () => {
      this._openDeletePopup(cardElement, cardId);
    });
  }

  _openDeletePopup(cardElement, cardId) {
    const deleteConfirmationPopupElement =
      document.querySelector("#deleteCard");

    if (!deleteConfirmationPopupElement) {
      console.log("El elemento #deleteCard no se encuentra en el DOM");
      return;
    }

    this._deleteConfirmationPopup = new Popup("#deleteCard");
    this._deleteConfirmationPopup.open();

    const confirmationButton =
      this._deleteConfirmationPopup._popup.querySelector(
        "#btnConfirmationDelete"
      );
    confirmationButton.addEventListener("click", (event) => {
      event.preventDefault();
      this._deleteCard(cardElement, cardId); // Pasar el cardId correctamente
      this._closeDeletePopup();
    });

    const closeButton = this._deleteConfirmationPopup._popup.querySelector(
      ".popup__container-image"
    );
    closeButton.addEventListener("click", () => {
      this._closeDeletePopup();
    });
  }

  _deleteCardFromServer(cardId) {
    const url = `cards/${cardId}`;
    apiInstance
      .deleteCard(url)
      .then((result) => {
        console.log("Imagen eliminada del servidor:", result);
      })
      .catch((error) => {
        console.log("Error al eliminar la imagen del servidor:", error);
      });
  }

  _deleteCard(cardElement, cardId) {
    this._deleteCardFromServer(cardId);
    cardElement.remove();
  }

  _closeDeletePopup() {
    this._deleteConfirmationPopup.close(); // Cerrar el popup deleteCard
  }

  _updateLikeCount(likeButton, cardElement) {
    const likeCounter = cardElement.querySelector(".photo-grid__likeCounter");
    likeCounter.textContent = this.likes.length.toString();
    if (this.likes.includes("881c7f60ed5326b0694b6b1a")) {
      likeButton.classList.add("photo-grid__like_active");
    } else {
      likeButton.classList.remove("photo-grid__like_active");
    }
  }

  _handleLikeClick(likeButton, cardElement) {
    const cardId = cardElement.dataset.cardId;

    if (likeButton.classList.contains("photo-grid__like_active")) {
      this._deleteLike(cardId)
        .then(() => {
          const likeCounter = cardElement.querySelector(
            ".photo-grid__likeCounter"
          );
          this.likes.splice(this.likes.indexOf("881c7f60ed5326b0694b6b1a"), 1);
          this._updateLikeCount(likeButton, cardElement);
        })
        .catch((error) => {
          console.log("Error al eliminar el like:", error);
        });
    } else {
      this._likeCard(cardId)
        .then(() => {
          const likeCounter = cardElement.querySelector(
            ".photo-grid__likeCounter"
          );
          this.likes.push("881c7f60ed5326b0694b6b1a");
          this._updateLikeCount(likeButton, cardElement);
        })
        .catch((error) => {
          console.log("Error al dar like:", error);
        });
    }
  }

  _likeCard(cardId) {
    return apiInstance.likeCard(`cards/likes/${cardId}`).catch((error) => {
      console.log("Error al dar like a la tarjeta:", error);
    });
  }

  _deleteLike(cardId) {
    return apiInstance.deleteLike(`cards/likes/${cardId}`).catch((error) => {
      console.log("Error al eliminar el like de la tarjeta:", error);
    });
  }

  createCard() {
    const cardElement = this._getTemplate();
    cardElement.dataset.cardId = this.cardId;
    this._fillCardData(cardElement);
    this._updateLikeCount(
      cardElement.querySelector(".photo-grid__like"),
      cardElement
    );

    this._setEventListeners(cardElement);

    const cardImage = cardElement.querySelector(".photo-grid__image");
    cardImage.addEventListener("click", (event) => {
      event.stopPropagation();
      this._handleCardClick(this.name, this.link);
    });

    return cardElement;
  }
}

export default Card;
export { initialCards };
