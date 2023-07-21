import apiInstance from "../components/api.js";
import Popup from "./popup.js";

class Card {
  constructor(data, handleCardClick, createPopup) {
    this.name = data.name;
    this.link = data.link;
    this.likes = data.likes || [];
    this.cardId = data.cardId;
    this._handleCardClick = handleCardClick;
    this._deleteConfirmationPopup = null;
    this._createPopup = createPopup;
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
    this._deleteConfirmationPopup = this._createPopup();
    this._deleteConfirmationPopup.open();

    const confirmationButton =
      this._deleteConfirmationPopup._popup.querySelector(
        "#btnConfirmationDelete"
      );
    confirmationButton.addEventListener("click", (event) => {
      event.preventDefault();

      const submitButton = this._deleteConfirmationPopup._popup.querySelector(
        "#btnConfirmationDelete"
      );
      submitButton.textContent = "ELIMINANDO...";
      setTimeout(() => {
        this._deleteCard(cardElement, cardId);
        this._closeDeletePopup();
        submitButton.textContent = "SI";
      }, 1000);
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
    return apiInstance.deleteCard(url).catch((error) => {
      console.log("Error al eliminar la imagen del servidor:", error);
      throw error; // Lanzar el error para que se pueda manejar en _deleteCard
    });
  }

  _deleteCard(cardElement, cardId) {
    if (cardElement.classList.contains("deleting")) {
      return;
    }

    cardElement.classList.add("deleting");

    this._deleteCardFromServer(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch((error) => {
        console.log("Error al eliminar la imagen del servidor:", error);
      })
      .finally(() => {
        cardElement.classList.remove("deleting");
      });
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

    this._configureDeleteEvent(cardElement, this.cardId);

    return cardElement;
  }
}

export default Card;
