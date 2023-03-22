let popup = document.querySelector(".popup");
let edit = document.querySelector(".profile-info__edit");
let close = document.querySelector(".popup__container_image");
let guardar = document.querySelector(".form__guardar");
let nameInput = document.querySelector(".form__name");
let aboutMeInput = document.querySelector(".form__about-me");
let nombre = document.querySelector(".profile-info__nombre");
let aboutMe = document.querySelector(".profile-info__about-me");

// Mostrar popup y llenar inputs con información actual
edit.addEventListener("click", function (event) {
  event.preventDefault();
  popup.style.display = "block";
  nameInput.value = nombre.textContent;
  aboutMeInput.value = aboutMe.textContent;
});

// Actualizar información y ocultar popup
guardar.addEventListener("click", function (event) {
  event.preventDefault(); // previene el comportamiento por defecto del botón submit
  nombre.textContent = nameInput.value;
  aboutMe.textContent = aboutMeInput.value;
  popup.style.display = "none";
});

// Cerrar popup sin actualizar información
close.addEventListener("click", function () {
  popup.style.display = "none";
});
