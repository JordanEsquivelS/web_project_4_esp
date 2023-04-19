const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile-info__edit");
const closePopupButton = document.querySelector(".popup__container-image");
const saveButton = document.querySelector(".form__save");
const nameInput = document.querySelector(".form__name");
const aboutMeInput = document.querySelector("#form__input-aboutMe");
const nameProfile = document.querySelector(".profile-info__nombre");
const aboutMe = document.querySelector(".profile-info__about-me");
const onlyLetters = /^[a-zA-Z\s]+$/;

// Mostrar popup y llenar inputs con información actual
function editDataProfile(event) {
  event.preventDefault();
  popup.classList.add("open");
  nameInput.value = nameProfile.textContent;
  aboutMeInput.value = aboutMe.textContent;
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
  }
}

saveButton.addEventListener("click", saveDataProfile);

// Cerrar popup sin actualizar información
function closePopupProfile(event) {
  popup.classList.remove("open");
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
