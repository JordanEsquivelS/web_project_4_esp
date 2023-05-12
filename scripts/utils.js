import FormValidator from "./FormValidator.js";
import { popupNewPlace, form, Swal } from "./index.js";
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__container-image");
const saveButton = document.querySelector(".form__save");
const nameInput = document.querySelector(".form__name");
const aboutMeInput = document.querySelector("#aboutMe");
const nameProfile = document.querySelector(".profile-info__nombre");
const aboutMe = document.querySelector(".profile-info__about-me");
const onlyLetters = /^[a-zA-Z\s]+$/;
const editButton = document.querySelector(".profile-info__edit");

/*popupProfile */

const formValidatorConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formValidator = new FormValidator(
  formValidatorConfig,
  popup.querySelector(".popup__form")
);
formValidator.enableValidation();

// Mostrar popup y llenar inputs con información actual
function editDataProfile(event) {
  event.preventDefault();
  popup.classList.add("open");
  nameInput.value = nameProfile.textContent;
  aboutMeInput.value = aboutMe.textContent;
}

editButton.addEventListener("click", editDataProfile);

// Cerrar popup sin actualizar información
function closePopupProfile(event) {
  popup.classList.remove("open");
  nameInput.classList.remove("focus"); // eliminar la clase focus
}

closePopupButton.addEventListener("click", closePopupProfile);

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
    nameInput.classList.remove("focus"); // eliminar la clase focus
    formValidator.resetValidation();
  }
}

saveButton.addEventListener("click", saveDataProfile);

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

/* place */
const placeAdd = document.querySelector(".profile__addPlace");

function openPopupPlace() {
  popupNewPlace.classList.add("open");
  const formValidatorConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };
  const formValidator = new FormValidator(formValidatorConfig, form);
  formValidator.enableValidation();
}

// Agregar un evento de click al botón "Agregar"
placeAdd.addEventListener("click", openPopupPlace);

function closePopupPlace() {
  popupNewPlace.classList.remove("open");
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

export { closePopupPlace };
