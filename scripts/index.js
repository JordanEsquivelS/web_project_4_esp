import Card from "./Card.js";
import { closePopupPlace } from "./utils.js";
/* cards-images */

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

const gridContainer = document.getElementById("grid-container");

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template").createCard();
  gridContainer.appendChild(card);
});

/*PLACE */
const Swal = window.Sweetalert2;
const popupNewPlace = document.querySelector("#new-place");
const form = popupNewPlace.querySelector("form");
let nextId = 1;

function addNewCard(event) {
  event.preventDefault();
  const title = getTitle();
  const link = getLink();
  if (!title || !link) {
    showError();
    return false;
  }
  const id = generateId();
  addCard(initialCards, id, title, link);
  updateGridPhotos(id, link, title);
  closePopupPlace();
  resetForm();
  addEventDeleteCard();
}

function getTitle() {
  return form.querySelector("#titlePlace").value;
}

function getLink() {
  return form.querySelector("#input-url").value;
}

function showError() {
  Swal.fire({
    title: "Error!",
    text: "Por favor ingrese todos los datos.",
    icon: "error",
    confirmButtonText: "Ok",
    /* corregido la fuente en swal2-popup.css*/
  });
}

function generateId() {
  const id = `card-${nextId}`;
  nextId++;
  return id;
}

function addCard(tarjetas, id, title, link) {
  tarjetas.unshift({ id, name: title, link });
}

function updateGridPhotos(id, link, title) {
  const photoGridContainer = document.getElementById("grid-container");
  const newCard = new Card({ id, name: title, link }, "#card-template");
  photoGridContainer.insertBefore(
    newCard.createCard(),
    photoGridContainer.firstChild
  );
}

function resetForm() {
  form.reset();
}

form.addEventListener("submit", addNewCard);

function addEventDeleteCard() {
  const deleteButtons = document.querySelectorAll(".photo-grid__delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (evt) => {
      const photoGrid = evt.target.closest(".photo-grid");
      const id = photoGrid.getAttribute("data-id");
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
          photoGrid.remove(); // Eliminar la tarjeta del DOM
          // Eliminar la tarjeta correspondiente de initialCards
          initialCards = initialCards.filter((card) => card.id !== id);
          Swal.fire("¡Eliminado!", "La tarjeta ha sido eliminada.", "success");
        }
      });
    });
  });
}

addEventDeleteCard();

/* footer año */

// Obtener el elemento del pie de página con la clase "footer__copyright"
const footer = document.querySelector(".footer__copyright");

// Obtener el año actual
const year = new Date().getFullYear();

// Crear un nodo de texto con el símbolo de copyright
const symbol = document.createTextNode(String.fromCharCode(169));

// Agregar el símbolo de copyright y el año actual al contenido del elemento
footer.textContent = ` ${year} Jordan Esquivel Silva `;
footer.prepend(symbol);

export { popupNewPlace, form, Swal };
