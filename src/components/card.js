const Swal = window.Sweetalert2;
let initialCards = [
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

function handleCardClick(name, link) {
  const popup = new PopupWithImage(".popImg");
  popup.open(link, name);
  const overlay = document.querySelector(".popup__form");
  const popupCloseButton = document.querySelector(
    ".images-popup__item-close-button"
  );

  popupCloseButton.addEventListener("click", () => {
    popup.close();
  });

  document.addEventListener("keydown", (evt) => {
    popup._handleEscClose(evt);
  });

  overlay.addEventListener("click", () => {
    popup.close();
  });
}

class Card {
  constructor(data, handleCardClick) {
    this.name = data.name;
    this.link = data.link;
    this._handleCardClick = handleCardClick;
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
    deleteButton.addEventListener("click", (evt) => {
      const photoGrid = evt.target.closest(".photo-grid");

      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this._deleteCard(photoGrid);
          Swal.fire("¡Eliminado!", "La tarjeta ha sido eliminada.", "success");
        }
      });
    });
  }

  _deleteCard(cardElement) {
    cardElement.remove();

    const deleteEvent = new CustomEvent("cardDeleted", {
      detail: { cardId: this.id },
    });
    document.dispatchEvent(deleteEvent);
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
