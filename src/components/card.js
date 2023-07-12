import Popup from "./popup.js";
const initialCards = [
  {
    id: "card-0",
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    id: "card-1",
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    id: "card-2",
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    id: "card-3",
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    id: "card-4",
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    id: "card-5",
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

class Card {
  constructor(data, handleCardClick) {
    this.id = data.id;
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

    const confirmationButton = this._deleteConfirmationPopup._popup.querySelector(
      "#btnConfirmationDelete"
    );
    confirmationButton.addEventListener("click", (event) => {
      event.preventDefault();
      this._deleteCard(cardElement);
      this._closeDeletePopup();
    });

    // Configurar evento de cierre del popup cuando se hace clic en el botón de cerrar
    const closeButton = this._deleteConfirmationPopup._popup.querySelector(".popup__container-image");
    closeButton.addEventListener("click", () => {
      this._closeDeletePopup();
    });
  }

  _deleteCard(cardElement) {
    cardElement.remove();

    const deleteEvent = new CustomEvent("cardDeleted", {
      detail: { cardId: this.id },
    });
    document.dispatchEvent(deleteEvent);
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
