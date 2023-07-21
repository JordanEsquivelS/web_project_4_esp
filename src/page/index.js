import "../page/index.css";
import FormValidator from "../components/formValidator.js";
import Section from "../components/section.js";
import Card from "../components/card.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from "../components/userInfo.js";
import UserPicture from "../components/userPicture.js";
import PopupWithImage from "../components/popupWithImage.js";
import apiInstance from "../components/api";
import Popup from "../components/popup.js";

const Swal = window.Sweetalert2;
// Obtener referencias a los elementos del DOM
const editButton = document.querySelector(".profile-info__edit");
const addButton = document.querySelector(".profile__addPlace");
const closeImageButton = document.querySelector(".popImg__close");
const imgProfileEdit = document.querySelector(".profile__overlayImg");

// Crear una instancia de PopupWithImage fuera de las funciones
const popupImage = new PopupWithImage(".popImg");

// Configurar el cuadro emergente de imagen
const handleCardClick = (name, link) => {
  popupImage.open(name, link);
};

closeImageButton.addEventListener("click", () => {
  popupImage.close();
});

const initialCards = [];

apiInstance
  .getInitialCards("/cards")
  .then((cards) => {
    const transformedCards = cards.map((card, index) => ({
      id: `card-${index}`,
      name: card.name,
      link: card.link,
      owner: card.owner,
      cardId: card._id,
      likes: card.likes || [],
    }));
    transformedCards.reverse();

    const sectionOptions = {
      items: transformedCards,
      renderer: (item) => {
        const card = new Card(
          item,
          handleCardClick,
          () => new Popup("#deleteCard")
        );
        const cardElement = card.createCard();

        cardElement.dataset.cardId = item.cardId;

        if (item.owner._id === "881c7f60ed5326b0694b6b1a") {
          const deleteButton = cardElement.querySelector(".photo-grid__delete");
          deleteButton.style.display = "block";
          if (item.cardId) {
            card._configureDeleteEvent(cardElement, item.cardId);
          }
        } else {
          const deleteButton = cardElement.querySelector(".photo-grid__delete");
          deleteButton.style.display = "none";
        }

        const likeButton = cardElement.querySelector(".photo-grid__like");
        const likeCounter = cardElement.querySelector(
          ".photo-grid__likeCounter"
        );

        if (
          item.likes &&
          item.likes.some((like) => like._id === "881c7f60ed5326b0694b6b1a")
        ) {
          likeButton.classList.add("photo-grid__like_active");
        }

        if (item.likes && item.likes.length) {
          likeCounter.textContent = item.likes.length.toString();
        }

        section.addItem(cardElement);
      },
    };

    const section = new Section(sectionOptions, "#grid-container");
    section.render();
  })
  .catch((error) => {
    console.log("Error al obtener las tarjetas iniciales:", error);
  });

// Configurar el validador de formularios
const formValidatorOptions = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  inputDefaultClass: "popup__input_type_default",
};

const imgFormElement = document.querySelector("#edit-ImgProfile .popup__form");
const imgValidator = new FormValidator(formValidatorOptions, imgFormElement);
imgValidator.enableValidation();

const formElement = document.querySelector("#edit-profile .popup__form");
const formuValidator = new FormValidator(formValidatorOptions, formElement);
formuValidator.enableValidation();

const newPlaceFormElement = document.querySelector("#new-place .popup__form");
const newPlaceFormValidator = new FormValidator(
  formValidatorOptions,
  newPlaceFormElement
);
newPlaceFormValidator.enableValidation();

// Configurar la sección de tarjetas
const sectionOptions = {
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, handleCardClick);
    const cardElement = card.createCard();
    section.addItem(cardElement);
  },
};

const section = new Section(sectionOptions, "#grid-container");
section.render();

// Configurar el cuadro emergente de formulario
const editImgForm = new PopupWithForm(
  "#edit-ImgProfile",
  submitImgCallback,
  imgValidator
);

const popupForm = new PopupWithForm(
  "#edit-profile",
  submitFormCallback,
  formuValidator
);
const newPlaceForm = new PopupWithForm(
  "#new-place",
  submitNewPlaceCallback,
  newPlaceFormValidator
);

popupForm.setEventListeners();
newPlaceForm.setEventListeners();
editImgForm.setEventListeners();

editButton.addEventListener("click", () => {
  const name = userInfo._nameElement.textContent;
  const about = userInfo._professionElement.textContent;
  userInfo.setUserInfo(name, about);
  popupForm.open();
});

addButton.addEventListener("click", () => {
  popupForm.close();
  newPlaceForm.open();
});

imgProfileEdit.addEventListener("click", () => {
  editImgForm.open();
});

// Configurar la información del usuario
const userInfo = new UserInfo(
  ".profile-info__nombre",
  ".profile-info__about-me",
  "#name",
  "#aboutMe",
  "#submit_editProfile",
  formuValidator
);
// Crear una instancia de UserPicture y configurarla
const userPictureInstance = new UserPicture(
  "#profileImage",
  "#input-urlImg",
  "#submit_imgProfile",
  imgValidator
);

apiInstance
  .getUserInfo("users/me")
  .then((data) => {
    const { name, about, avatar } = data;
    userInfo.setUserInfo(name, about);
    const profileImage = document.querySelector("#profileImage");
    profileImage.src = avatar;
  })
  .catch((error) => {
    console.log("Error al obtener la información del usuario:", error);
  });

// Función de devolución de llamada para enviar el formulario de edición
function submitFormCallback() {
  const nameInput = document.querySelector("#name").value;
  const aboutMeInput = document.querySelector("#aboutMe").value;
  const submitButton = document.querySelector("#submit_editProfile");

  if (
    nameInput.trim() === "" ||
    !/^[a-zA-Z\s\u00C0-\u017FáéíóúÁÉÍÓÚüÜñÑ.,]*$/.test(nameInput.trim())
  ) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Asegúrate de que el campo de nombre solo contenga letras, acentos y punto.",
    });
    popupForm.close();
    return;
  }

  userInfo.setUserInfo(nameInput, aboutMeInput);

  // Cambiar el texto del botón a "GUARDANDO..."
  submitButton.textContent = "GUARDANDO...";

  // Cerrar el formulario después de 0.5 segundos
  setTimeout(function () {
    popupForm.close();
    // Cambiar el texto del botón de vuelta a "Guardar"
    submitButton.textContent = "Guardar";
  }, 600);
}

function submitNewPlaceCallback() {
  const name = document.querySelector("#titlePlace").value;
  const link = document.querySelector("#input-url").value;
  const submitButton = document.querySelector("#create");

  // Cambiar el texto del botón a "GUARDANDO..."
  submitButton.textContent = "GUARDANDO...";

  // Crear la nueva tarjeta a través del API
  apiInstance
    .postNewCard(name, link, "cards")
    .then((result) => {
      // Obtener el ID de la tarjeta recién creada
      const cardId = result._id;

      // Crear una instancia de la tarjeta
      const card = new Card(
        {
          name: name,
          link: link,
          likes: [],
          cardId: cardId,
        },
        handleCardClick,
        () => new Popup("#deleteCard")
      );

      // Crear el elemento de la tarjeta
      const cardElement = card.createCard();

      // Configurar el evento de eliminación de la tarjeta
      card._configureDeleteEvent(cardElement, cardId);

      // Agregar la tarjeta al DOM
      section.addItem(cardElement);
    })
    .catch((error) => {
      console.log("Error al agregar la nueva imagen:", error);
    })
    .finally(() => {
      // Restablecer el texto del botón después de un tiempo
      setTimeout(() => {
        newPlaceForm.close();
        submitButton.textContent = "CREAR";
      }, 500);
    });
}

// Función de devolución de llamada para enviar el formulario de imagen
function submitImgCallback(event) {
  event.preventDefault();
  const inputUrl = document.querySelector("#input-urlImg").value;
  userPictureInstance.setUserPicture(inputUrl);
  editImgForm.close();
}

document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("popup") ||
    event.target.classList.contains("popup__container")
  ) {
    popupForm.close();
    newPlaceForm.close();
    editImgForm.close();
    const deleteConfirmationPopup = document.querySelector("#deleteCard");
    if (deleteConfirmationPopup) {
      deleteConfirmationPopup.classList.remove("open");
    }
  }
});

document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("popImg") ||
    event.target.classList.contains("popImg__container")
  ) {
    popupImage.close();
  }
});

/* footer año */

// Obtener el elemento del pie de página con la clase "footer__copyright"
const footer = document.querySelector(".footer__copyright");

// Obtener el año actual
const year = new Date().getFullYear();

// Crear un nodo de texto con el símbolo de copyright
const symbol = document.createTextNode(String.fromCharCode(169));

// Agregar el símbolo de copyright y el año actual al contenido del elemento
footer.textContent = ` ${year} Jordan Esquivel Silva `;
footer.prepend(symbol);
/*
export { handleCardClick };*/
