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
    }));
    initialCards.reverse(); // Invertir el orden de los elementos
    // Configurar la sección de tarjetas después de recibir las imágenes del servidor
    const sectionOptions = {
      items: initialCards,
      renderer: (item) => {
        const card = new Card(item, handleCardClick);
        const cardElement = card.createCard();
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

  _configureDeleteEvent(cardElement) {
    const deleteButton = cardElement.querySelector(".photo-grid__delete");
    deleteButton.addEventListener("click", () => {
      this._openDeletePopup(cardElement);
    });
  }

  _openDeletePopup(cardElement) {
    this._deleteConfirmationPopup.open(); // Abrir el popup deleteCard

    const confirmationButton =
      this._deleteConfirmationPopup._popup.querySelector(
        "#btnConfirmationDelete"
      );
    confirmationButton.addEventListener("click", (event) => {
      event.preventDefault();
      this._deleteCard(cardElement);
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

  _deleteCard(cardElement) {
    cardElement.remove();
  }

  _closeDeletePopup() {
    this._deleteConfirmationPopup.close(); // Cerrar el popup deleteCard
  }

  createCard() {
    const cardElement = this._getTemplate();
    this._fillCardData(cardElement);
    this._setEventListeners(cardElement);
    this._configureDeleteEvent(cardElement);

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
