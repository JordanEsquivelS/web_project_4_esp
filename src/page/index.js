import "../page/index.css";
import FormValidator from "../components/formValidator.js";
import Section from "../components/section.js";
import Card, { initialCards } from "../components/card.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from "../components/userInfo.js";
import PopupWithImage from "../components/popupWithImage.js";

// Obtener referencias a los elementos del DOM
const editButton = document.querySelector(".profile-info__edit");
const addButton = document.querySelector(".profile__addPlace");
const formElement = document.querySelector(".popup__form");
const closeImageButton = document.querySelector(".popImg__close");

// Crear una instancia de PopupWithImage fuera de las funciones
const popupImage = new PopupWithImage(".popImg");

// Configurar el cuadro emergente de imagen
const handleCardClick = (name, link) => {
  popupImage.open(name, link);
};

closeImageButton.addEventListener("click", () => {
  popupImage.close();
});

// Configurar el validador de formularios
const formValidatorOptions = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  inputDefaultClass: "popup__input_type_default",
};

const formValidator = new FormValidator(formValidatorOptions, formElement);
formValidator.enableValidation();

const newPlaceFormElement = document.querySelector("#new-place .popup__form");
const newPlaceFormValidator = new FormValidator(
  formValidatorOptions,
  newPlaceFormElement
);
newPlaceFormValidator.enableValidation();

// Configurar la sección de tarjetas
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

// Configurar el cuadro emergente de formulario
const popupForm = new PopupWithForm(
  "#edit-profile",
  submitFormCallback,
  formValidator
);
const newPlaceForm = new PopupWithForm(
  "#new-place",
  submitNewPlaceCallback,
  newPlaceFormValidator
);

popupForm.setEventListeners();
newPlaceForm.setEventListeners();

editButton.addEventListener("click", () => {
  userInfo.setUserInfo();
  popupForm.open();
});

addButton.addEventListener("click", () => {
  popupForm.close();
  newPlaceForm.open();
});

// Configurar la información del usuario
const userInfo = new UserInfo(
  ".profile-info__nombre",
  ".profile-info__about-me",
  "#name",
  "#aboutMe",
  ".popup__button",
  formValidator
);

// Función de devolución de llamada para enviar el formulario de edición
function submitFormCallback() {
  popupForm.close();
}

// Función de devolución de llamada para enviar el formulario de nuevo lugar
function submitNewPlaceCallback() {
  const name = document.querySelector("#titlePlace").value;
  const link = document.querySelector("#input-url").value;

  // Crea una nueva tarjeta con los datos del formulario
  const newCard = new Card(
    {
      id: "card-" + (section._items.length + 1),
      name: name,
      link: link,
    },
    handleCardClick
  );

  // Obtén el elemento del DOM de la nueva tarjeta
  const newCardElement = newCard.createCard();

  // Agrega la nueva tarjeta al contenedor
  section.addItem(newCardElement);

  newPlaceForm.close();
}

// Cerrar formularios al hacer clic fuera de ellos
document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("popup") ||
    event.target.classList.contains("popup__container")
  ) {
    popupForm.close();
    newPlaceForm.close();
  }
});

document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("popImg") ||
    event.target.classList.contains("popImg__container")
  ) {
    popupImage.close();
  }
});

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
