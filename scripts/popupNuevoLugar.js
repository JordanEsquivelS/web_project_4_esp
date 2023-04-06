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
  // Validar el título y el link
  if (!titulo || !link) {
    Swal.fire({
      title: "Error!",
      text: "Por favor ingrese todos los datos.",
      icon: "error",
      confirmButtonText: "Ok",
    });
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

  function cambiarIconoCorazon() {
    if (this.src.includes("/images/corazon_blanco.svg")) {
      this.src = "images/corazon_negro.svg";
    } else {
      this.src = "images/corazon_blanco.svg";
    }
  }

  heartIcons.forEach(function (heartIcon) {
    heartIcon.addEventListener("click", cambiarIconoCorazon);
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

    // Mostrar un diálogo de confirmación antes de eliminar la tarjeta
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Obtener el índice de la tarjeta con el id correspondiente en la variable initialCards
        let index = initialCards.findIndex(function (tarjeta) {
          return tarjeta.id === id;
        });

        // Eliminar la tarjeta de la variable initialCards
        if (index !== -1) {
          initialCards.splice(index, 1);
        }

        // Eliminar el elemento del DOM
        card.remove();

        // Mostrar un mensaje de éxito
        Swal.fire("¡Eliminado!", "La tarjeta ha sido eliminada.", "success");
      }
    });
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
