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

function agregarNuevaTarjeta(event) {
  event.preventDefault();
  const titulo = obtenerTitulo();
  const link = obtenerLink();
  if (!titulo || !link) {
    mostrarError();
    return false;
  }
  const id = generarId();
  agregarTarjeta(initialCards, id, titulo, link);
  actualizarCuadriculaFotos(id, link, titulo);
  cerrarVentanaEmergente();
  resetearFormulario();
  agregarEventoLike();
  agregarEventoEliminarTarjeta();
}

function obtenerTitulo() {
  return form.querySelector("#titulo").value;
}

function obtenerLink() {
  return form.querySelector("#form__input-url").value;
}

function mostrarError() {
  Swal.fire({
    title: "Error!",
    text: "Por favor ingrese todos los datos.",
    icon: "error",
    confirmButtonText: "Ok",
  });
}

function generarId() {
  const id = `card-${nextId}`;
  nextId++;
  return id;
}

function agregarTarjeta(tarjetas, id, titulo, link) {
  tarjetas.unshift({ id, name: titulo, link });
}

function actualizarCuadriculaFotos(id, link, titulo) {
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
}

function cerrarVentanaEmergente() {
  popupNuevoLugar.classList.remove("open");
}

function resetearFormulario() {
  form.reset();
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
