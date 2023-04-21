import {
  showInputError,
  hideInputError,
  checkInputValidity,
  setEventListeners,
  enableValidation,
  resetValidation,
} from "./validate.js";
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
