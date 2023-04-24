import {
  showInputError,
  hideInputError,
  checkInputValidity,
  setEventListeners,
  enableValidation,
  resetValidation,
} from "./validate.js";

/* cards-images */
/* declare let a  initialCards porque en consola la linea 298 asi: Uncaught (in promise) TypeError: Assignment to constant variable*/
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
const cardTemplate = document.getElementById("card-template");

initialCards.forEach((card) => {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".photo-grid__image");
  const cardText = cardElement.querySelector(".photo-grid__text");

  cardImage.src = card.link;
  cardText.textContent = card.name;
  cardImage.alt = card.name;
  gridContainer.appendChild(cardElement);
});

/*popupProfile */
const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile-info__edit");
const closePopupButton = document.querySelector(".popup__container-image");
const saveButton = document.querySelector(".form__save");
const nameInput = document.querySelector(".form__name");
const aboutMeInput = document.querySelector("#aboutMe");
const nameProfile = document.querySelector(".profile-info__nombre");
const aboutMe = document.querySelector(".profile-info__about-me");
const onlyLetters = /^[a-zA-Z\s]+$/;

// Mostrar popup y llenar inputs con información actual
function editDataProfile(event) {
  event.preventDefault();
  popup.classList.add("open");
  nameInput.value = nameProfile.textContent;
  aboutMeInput.value = aboutMe.textContent;
  addEventListener("DOMContentLoaded", () => {
    showInputError(formElement, inputElement, errorMessage);
    hideInputError(formElement, inputElement);
    checkInputValidity(formElement, inputElement);
    setEventListeners(formElement);
    enableValidation({
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    });
  });
}
editButton.addEventListener("click", editDataProfile);

// Actualizar información y ocultar popup
function saveDataProfile(event) {
  event.preventDefault(); // previene el comportamiento por defecto del botón submit
  if (nameInput.value.trim() === "" || aboutMeInput.value.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor completa los campos requeridos.",
    });
  } else if (!onlyLetters.test(nameInput.value.trim())) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Asegúrate de que el campo de nombre solo contenga letras.",
    });
  } else {
    nameProfile.textContent = nameInput.value.trim();
    aboutMe.textContent = aboutMeInput.value.trim();
    popup.classList.remove("open");
    resetValidation(popup);
  }
}

saveButton.addEventListener("click", saveDataProfile);

// Cerrar popup sin actualizar información
function closePopupProfile(event) {
  popup.classList.remove("open");
  resetValidation(popup);
}

closePopupButton.addEventListener("click", closePopupProfile);

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopupProfile();
  }
});

// Cerrar popup al hacer clic fuera del formulario
document.addEventListener("click", function (evt) {
  if (
    !evt.target.closest(".popup__container") &&
    !evt.target.classList.contains("profile-info__edit")
  ) {
    closePopupProfile();
  }
});

// Importar la variable Swal
const Swal = window.Sweetalert2;

const placeAdd = document.querySelector(".profile__addPlace");
const popupNewPlace = document.querySelector("#new-place");
const form = popupNewPlace.querySelector("form");
let likeButton = document.querySelectorAll(".photo-grid__like");

function openPopupPlace() {
  popupNewPlace.classList.add("open");
  addEventListener("DOMContentLoaded", () => {
    showInputError(formElement, inputElement, errorMessage);
    hideInputError(formElement, inputElement);
    checkInputValidity(formElement, inputElement);
    setEventListeners(formElement);
    enableValidation({
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    });
  });
}

// Agregar un evento de click al botón "Agregar"
placeAdd.addEventListener("click", openPopupPlace);

function closePopupPlace() {
  popupNewPlace.classList.remove("open");
  form.reset();
  resetValidation(popupNewPlace);
}

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopupPlace();
  }
});

document.addEventListener("click", function (event) {
  if (
    !event.target.closest(".popup__container") &&
    !event.target.classList.contains("profile__addPlace")
  ) {
    closePopupPlace();
  }
});

// Agregar un evento de click al botón "Cerrar" dentro de la ventana emergente
const closePlace = document.querySelector("#closePlace");
closePlace.addEventListener("click", closePopupPlace);

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
  const template = document.querySelector("#card-template");
  const clone = template.content.cloneNode(true);
  const photoGrid = clone.querySelector(".photo-grid");
  const image = clone.querySelector(".photo-grid__image");
  const text = clone.querySelector(".photo-grid__text");

  photoGrid.id = id; // Asignar un ID único a la tarjeta de foto
  photoGrid.setAttribute("data-id", id); // agregar atributo data-id al elemento .photo-grid
  image.src = link;
  image.alt = title; // Asignar el título de la imagen al atributo alt de la imagen de la tarjeta de foto
  text.textContent = title;

  const photoGridContainer = document.getElementById("grid-container");
  photoGridContainer.insertBefore(clone, photoGridContainer.firstChild);

  likeButton = document.querySelectorAll(".photo-grid__like");

  likeButton.forEach((el) => {
    el.addEventListener("click", likeButtonActive);
  });
}

function resetForm() {
  form.reset();
}

form.addEventListener("submit", addNewCard);

function likeButtonActive(evt) {
  evt.target.classList.toggle("photo-grid__like_active");
}

likeButton.forEach((el) => {
  el.addEventListener("click", likeButtonActive);
});

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
        }
      });
    });
  });
}

addEventDeleteCard();

/*popupBigImage */
const photoGridContainer = document.getElementById("grid-container");
const popupImagen = document.querySelector(".popImg");
const bigImage = document.querySelector(".popImg__bigImage");
const textImageLarge = document.querySelector(".popImg__text");
const closeImage = document.querySelector(".popImg__close");

function openPopup(title, src, alt) {
  bigImage.setAttribute("src", src);
  bigImage.setAttribute("alt", alt);
  textImageLarge.textContent = title;
  popupImagen.classList.add("open");
}

function closePopup() {
  popupImagen.classList.remove("open");
}

function handleKeyPress(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

photoGridContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("photo-grid__image")) {
    const title = event.target
      .closest(".photo-grid")
      .querySelector(".photo-grid__text").textContent;
    const src = event.target.getAttribute("src");
    const alt = event.target.getAttribute("alt");

    openPopup(title, src, alt);
  }
});

closeImage.addEventListener("click", closePopup);

document.addEventListener("keydown", handleKeyPress);

popupImagen.addEventListener("click", closePopup);

/* footer año */

// Obtener el elemento del pie de página con la clase "footer__copyright"
const footer = document.querySelector(".footer__copyright");

// Obtener el año actual
const year = new Date().getFullYear();

// Crear un nodo de texto con el símbolo de copyright
const symbol = document.createTextNode(String.fromCharCode(169));

// Agregar el símbolo de copyright y el año actual al contenido del elemento
footer.textContent = ` ${year} Alrededor de los EEUU`;
footer.prepend(symbol);
