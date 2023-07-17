import "../page/index.css";
import FormValidator from "../components/formValidator.js";
import Section from "../components/section.js";
import Card, { initialCards } from "../components/card.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from "../components/userInfo.js";
import UserPicture from "../components/userPicture.js";
import PopupWithImage from "../components/popupWithImage.js";
import apiInstance from "../components/api";

// Obtener referencias a los elementos del DOM
const editButton = document.querySelector(".profile-info__edit");
const addButton = document.querySelector(".profile__addPlace");
const closeImageButton = document.querySelector(".popImg__close");
const imgProfileEdit = document.querySelector(".profile__overlayImg");

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

const imgFormElement = document.querySelector("#edit-ImgProfile .popup__form");
const imgValidator = new FormValidator(formValidatorOptions, imgFormElement);
imgValidator.enableValidation();

const formElement = document.querySelector("#edit-profile .popup__form");
const formuValidator = new FormValidator(formValidatorOptions, formElement);
formuValidator.enableValidation();

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
const editImgForm = new PopupWithForm(
  "#edit-ImgProfile",
  submitImgCallback,
  imgValidator
);

const popupForm = new PopupWithForm(
  "#edit-profile",
  submitFormCallback,
  formuValidator
);
const newPlaceForm = new PopupWithForm(
  "#new-place",
  submitNewPlaceCallback,
  newPlaceFormValidator
);

popupForm.setEventListeners();
newPlaceForm.setEventListeners();
editImgForm.setEventListeners();

editButton.addEventListener("click", () => {
  const name = userInfo._nameElement.textContent;
  const about = userInfo._professionElement.textContent;
  userInfo.setUserInfo(name, about);
  popupForm.open();
});

addButton.addEventListener("click", () => {
  popupForm.close();
  newPlaceForm.open();
});

imgProfileEdit.addEventListener("click", () => {
  editImgForm.open();
});

// Configurar la información del usuario
const userInfo = new UserInfo(
  ".profile-info__nombre",
  ".profile-info__about-me",
  "#name",
  "#aboutMe",
  "#submit_editProfile",
  formuValidator
);
// Crear una instancia de UserPicture y configurarla
const userPictureInstance = new UserPicture(
  "#profileImage",
  "#input-urlImg",
  "#submit_imgProfile",
  imgValidator
);

apiInstance
  .getUserInfo("users/me")
  .then((data) => {
    const { name, about, avatar } = data;
    userInfo.setUserInfo(name, about);
    console.log(avatar); // Agregar esta línea para verificar el valor de la URL de la imagen
    const profileImage = document.querySelector("#profileImage");
    profileImage.src = avatar;
  })
  .catch((error) => {
    console.log("Error al obtener la información del usuario:", error);
  });

// Función de devolución de llamada para enviar el formulario de edición
function submitFormCallback(event) {
  event.preventDefault();

  const nameInput = document.querySelector("#name").value;
  const aboutMeInput = document.querySelector("#aboutMe").value;

  console.log("Valor de nameInput:", nameInput);
  console.log("Valor de aboutMeInput:", aboutMeInput);

  userInfo.setUserInfo(nameInput, aboutMeInput);
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
// Función de devolución de llamada para enviar el formulario de imagen
function submitImgCallback(event) {
  event.preventDefault();
  const inputUrl = document.querySelector("#input-urlImg").value;
  console.log("Valor de urlInput:", inputUrl);

  userPictureInstance.setUserPicture(inputUrl);

  editImgForm.close();
}

document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("popup") ||
    event.target.classList.contains("popup__container")
  ) {
    popupForm.close();
    newPlaceForm.close();
    editImgForm.close();
    const deleteConfirmationPopup = document.querySelector("#deleteCard");
    if (deleteConfirmationPopup) {
      deleteConfirmationPopup.classList.remove("open");
    }
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
