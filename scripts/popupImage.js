const lugarAgregar = document.querySelector(".profile__agregar");
const popupNuevoLugar = document.querySelector("#nuevo-lugar");
const form = popupNuevoLugar.querySelector("form");

// Agregar un evento de click al botón "Agregar"
lugarAgregar.addEventListener("click", () => {
  popupNuevoLugar.classList.add("open");
});

// Agregar un evento de click al botón "Cerrar" dentro de la ventana emergente
const cerrarLugar = document.querySelector("#cerrarLugar");
cerrarLugar.addEventListener("click", () => {
  popupNuevoLugar.classList.remove("open");
});

// Agregar un evento de envío al formulario dentro de la ventana emergente
form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  // Obtener los valores de los campos del formulario
  const titulo = form.querySelector("#titulo").value;
  const link = form.querySelector("#form__input-url").value;
  if (titulo.value === "" || link.value === "") {
    alert("Por favor ingrese todos los datos.");
    return false;
  }
  // Agregar la nueva tarjeta al principio del array initialCards
  const nuevaTarjeta = { name: titulo, link };
  initialCards.unshift(nuevaTarjeta);

  // Actualizar la cuadrícula de fotos en el archivo cards-images.js
  const photoGridContainer = document.getElementById("grid-container");
  const nuevaTarjetaHTML = `
    <div class="photo-grid">
      <img class="photo-grid__image" src="${link}" />
      <div class="photo-grid__description">
        <p class="photo-grid__text">${titulo}</p>
        <img class="photo-grid__like" src="images/corazon_blanco.svg" alt="icono de like o corazon" />
      </div>
    </div>
  `;
  photoGridContainer.insertAdjacentHTML("afterbegin", nuevaTarjetaHTML);

  // Cerrar la ventana emergente
  popupNuevoLugar.classList.remove("open");

  // Resetear el formulario
  form.reset();

  // Aplicar el evento de clic a todas las imágenes
  agregarEventoLike();
});

function agregarEventoLike() {
  let heartIcons = document.querySelectorAll(".photo-grid__like");

  heartIcons.forEach(function (heartIcon) {
    heartIcon.addEventListener("click", function () {
      if (heartIcon.src.includes("/images/corazon_blanco.svg")) {
        heartIcon.src = "images/corazon_negro.svg";
      } else {
        heartIcon.src = "images/corazon_blanco.svg";
      }
    });
  });
}

// Llama a la función una vez para aplicar el evento de clic a las imágenes existentes
agregarEventoLike();
