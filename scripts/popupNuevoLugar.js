const lugarAgregar = document.querySelector(".profile__agregar");
const popupNuevoLugar = document.querySelector("#nuevo-lugar");
const form = popupNuevoLugar.querySelector("form");

function abrirPopupLugar() {
  popupNuevoLugar.classList.add("open");
}

// Agregar un evento de click al botón "Agregar"
lugarAgregar.addEventListener("click", abrirPopupLugar);

function cerrarPopupLugar() {
  popupNuevoLugar.classList.remove("open");
  form.reset();
}

// Agregar un evento de click al botón "Cerrar" dentro de la ventana emergente
const cerrarLugar = document.querySelector("#cerrarLugar");
cerrarLugar.addEventListener("click", cerrarPopupLugar);

let nextId = 1;

function agregarNuevaTarjeta() {
  // Obtener los valores de los campos del formulario
  const titulo = form.querySelector("#titulo").value;
  const link = form.querySelector("#form__input-url").value;
  if (!titulo || !link) {
    alert("Por favor ingrese todos los datos.");
    return false;
  }

  // Generar un nuevo ID para la tarjeta
  const id = `card-${nextId}`;
  nextId++;

  // Agregar la nueva tarjeta al principio del array initialCards
  const nuevaTarjeta = { id, name: titulo, link };
  initialCards.unshift(nuevaTarjeta);

  // Actualizar la cuadrícula de fotos en el archivo cards-images.js
  const photoGridContainer = document.getElementById("grid-container");
  const nuevaTarjetaHTML = `
    <div id="${id}" class="photo-grid">
      <img class="photo-grid__image" src="${link}" />
      <img src="images/delete.svg" alt="imagen de tacho de basura blanco" class="photo-grid__delete">
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

  // Aplicar el evento de clic para eliminar tarjeta
  agregarEventoEliminarTarjeta();
}

form.addEventListener("submit", agregarNuevaTarjeta);

function agregarEventoLike() {
  let heartIcons = document.querySelectorAll(".photo-grid__like");

  function toggleHeartIcon() {
    if (this.src.includes("/images/corazon_blanco.svg")) {
      this.src = "images/corazon_negro.svg";
    } else {
      this.src = "images/corazon_blanco.svg";
    }
  }

  heartIcons.forEach(function (heartIcon) {
    heartIcon.addEventListener("click", toggleHeartIcon);
  });
}

function agregarEventoEliminarTarjeta() {
  function eliminarTarjeta() {
    let card = this.parentNode;
    let id = card.getAttribute("id");

    // Buscar la tarjeta con el id correspondiente en initialCards
    let tarjetaAEliminar = initialCards.find(function (tarjeta) {
      return tarjeta.id === id;
    });

    // Eliminar la tarjeta del array initialCards
    let index = initialCards.indexOf(tarjetaAEliminar);
    if (index !== -1) {
      initialCards.splice(index, 1);
    }

    // Actualizar la cuadrícula de fotos en el archivo cards-images.js
    const photoGridContainer = document.getElementById("grid-container");
    photoGridContainer.removeChild(card);
  }

  // Agregar un event listener a cada botón "photo-grid__delete"
  let deleteButtons = document.querySelectorAll(".photo-grid__delete");

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", eliminarTarjeta);
  });
}

// Llama a la función una vez para aplicar el evento de clic a las imágenes existentes
agregarEventoLike();
agregarEventoEliminarTarjeta();
