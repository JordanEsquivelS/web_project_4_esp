const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile-info__edit");
const closePopupButton = document.querySelector(".popup__container-image");
const saveButton = document.querySelector(".form__guardar");
const nameInput = document.querySelector(".form__name");
const aboutMeInput = document.querySelector("#form__input-aboutMe");
const nombre = document.querySelector(".profile-info__nombre");
const aboutMe = document.querySelector(".profile-info__about-me");
const soloLetras = /^[a-zA-Z\s]+$/;

// Mostrar popup y llenar inputs con información actual
function editarDatosProfile(event) {
  event.preventDefault();
  popup.classList.add("open");
  nameInput.value = nombre.textContent;
  aboutMeInput.value = aboutMe.textContent;
}
editButton.addEventListener("click", editarDatosProfile);

// Actualizar información y ocultar popup
function guardarDatosProfile(event) {
  event.preventDefault(); // previene el comportamiento por defecto del botón submit
  if (nameInput.value.trim() === "" || aboutMeInput.value.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor completa los campos requeridos.",
    });
  } else if (!soloLetras.test(nameInput.value.trim())) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Asegúrate de que el campo de nombre solo contenga letras.",
    });
  } else {
    nombre.textContent = nameInput.value.trim();
    aboutMe.textContent = aboutMeInput.value.trim();
    popup.classList.remove("open");
  }
}

saveButton.addEventListener("click", guardarDatosProfile);

// Cerrar popup sin actualizar información
function closePopupProfile(event) {
  popup.classList.remove("open");
}

closePopupButton.addEventListener("click", closePopupProfile);
