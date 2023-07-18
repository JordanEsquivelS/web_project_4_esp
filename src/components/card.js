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
    }));
    initialCards.reverse(); // Invertir el orden de los elementos
    // Configurar la sección de tarjetas después de recibir las imágenes del servidor
    const sectionOptions = {
      items: initialCards,
      renderer: (item) => {
        const card = new Card(item, handleCardClick);
        const cardElement = card.createCard();

        // Verificar si el propietario de la tarjeta coincide con tu ID de usuario
        if (item.owner._id === "881c7f60ed5326b0694b6b1a") {
          const deleteButton = cardElement.querySelector(".photo-grid__delete");
          deleteButton.style.display = "block";
          if (item.cardId) {
            card._configureDeleteEvent(cardElement, item.cardId); // Agregar el ID de la tarjeta al configurar el evento de eliminación
          }
        } else {
          const deleteButton = cardElement.querySelector(".photo-grid__delete");
          deleteButton.style.display = "none";
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
    this._handleCardClick = handleCardClick;
    this._deleteConfirmationPopup = new Popup("#deleteCard"); // Instancia de Popup para el popup deleteCard
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
      likeButton.classList.toggle("photo-grid__like_active");
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
    this._deleteConfirmationPopup.open(); // Abrir el popup deleteCard

    const confirmationButton =
      this._deleteConfirmationPopup._popup.querySelector(
        "#btnConfirmationDelete"
      );
    confirmationButton.addEventListener("click", (event) => {
      event.preventDefault();
      this._deleteCard(cardElement, cardId);
      this._closeDeletePopup();
    });

    // Configurar evento de cierre del popup cuando se hace clic en el botón de cerrar
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

  createCard() {
    const cardElement = this._getTemplate();
    this._fillCardData(cardElement);
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
