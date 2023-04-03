const popup = document.querySelector(".popup");
const edit = document.querySelector(".profile-info__edit");
const close = document.querySelector(".popup__container-image");
const guardar = document.querySelector(".form__guardar");
const nameInput = document.querySelector(".form__name");
const aboutMeInput = document.querySelector("#form__input-aboutMe");
const nombre = document.querySelector(".profile-info__nombre");
const aboutMe = document.querySelector(".profile-info__about-me");

// Mostrar popup y llenar inputs con información actual
edit.addEventListener("click", function (event) {
  event.preventDefault();
  popup.classList.add("open");
  /* popup.style.display = "block";*/
  nameInput.value = nombre.textContent;
  aboutMeInput.value = aboutMe.textContent;
});

// Actualizar información y ocultar popup
guardar.addEventListener("click", function (event) {
  event.preventDefault(); // previene el comportamiento por defecto del botón submit
  if (document.querySelector(".form").checkValidity()) {
    nombre.textContent = nameInput.value;
    aboutMe.textContent = aboutMeInput.value;
    popup.classList.remove("open");
    /*popup.style.display = "none";*/
  } else {
    alert("Por favor completa los campos requeridos.");
  }
});

// Cerrar popup sin actualizar información
close.addEventListener("click", function () {
  /*popup.style.display = "none";*/
  popup.classList.remove("open");
});
