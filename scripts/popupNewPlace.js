const placeAdd = document.querySelector(".profile__agregar");
const popupNewPlace = document.querySelector("#new-place");
const form = popupNewPlace.querySelector("form");

function openPopupPlace() {
  popupNewPlace.classList.add("open");
}

// Agregar un evento de click al botón "Agregar"
placeAdd.addEventListener("click", openPopupPlace);

function closePopupPlace() {
  popupNewPlace.classList.remove("open");
  form.reset();
}

// Agregar un evento de click al botón "Cerrar" dentro de la ventana emergente
const closePlace = document.querySelector("#closePlace");
closePlace.addEventListener("click", closePopupPlace);

let nextId = 1;

function addNewCard(event) {
  event.preventDefault();
  const title = getTitle();
  const link = getLink();
  if (!title || !link) {
    showError();
    return false;
  }
  const id = generateId();
  addCard(initialCards, id, title, link);
  updateGridPhotos(id, link, title);
  closePopup();
  resetForm();
  addEventLike();
  addEventDeleteCard();
}

function getTitle() {
  return form.querySelector("#titlePlace").value;
}

function getLink() {
  return form.querySelector("#form__input-url").value;
}

function showError() {
  Swal.fire({
    title: "Error!",
    text: "Por favor ingrese todos los datos.",
    icon: "error",
    confirmButtonText: "Ok",
  });
}

function generateId() {
  const id = `card-${nextId}`;
  nextId++;
  return id;
}

function addCard(tarjetas, id, title, link) {
  tarjetas.unshift({ id, name: title, link });
}

function updateGridPhotos(id, link, title) {
  const photoGridContainer = document.getElementById("grid-container");
  const newCardHTML = `
    <div id="${id}" class="photo-grid">
      <img class="photo-grid__image" src="${link}" />
      <img src="images/delete.svg" alt="imagen de tacho de basura blanco" class="photo-grid__delete">
      <div class="photo-grid__description">
        <p class="photo-grid__text">${title}</p>
        <img class="photo-grid__like" src="images/corazon_blanco.svg" alt="icono de like o corazon" />
      </div>
    </div>
  `;
  photoGridContainer.insertAdjacentHTML("afterbegin", newCardHTML);
}

function closePopup() {
  popupNewPlace.classList.remove("open");
}

function resetForm() {
  form.reset();
}

form.addEventListener("submit", addNewCard);

function addEventLike() {
  let heartIcons = document.querySelectorAll(".photo-grid__like");

  heartIcons.forEach(function (heartIcon) {
    heartIcon.addEventListener("click", function (evt) {
      evt.target.classList.toggle("photo-grid__like_active");
    });
  });
}

function addEventDeleteCard() {
  function removeCard() {
    let card = this.parentNode;
    let id = card.getAttribute("id");

    // Buscar la tarjeta con el id correspondiente en initialCards
    let cardToDelete = initialCards.find(function (card) {
      return card.id === id;
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
        let index = initialCards.findIndex(function (card) {
          return card.id === id;
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
    button.addEventListener("click", removeCard);
  });
}

// Llama a la función una vez para aplicar el evento de clic a las imágenes existentes
addEventLike();
addEventDeleteCard();
