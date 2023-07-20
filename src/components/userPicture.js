import apiInstance from "../components/api.js";

class UserPicture {
  constructor(
    profileImageSelector,
    inputUrlSelector,
    submitButtonSelector,
    formValidator
  ) {
    this._profilePictureElement = document.querySelector(profileImageSelector);
    this._profilePictureInput = document.querySelector(inputUrlSelector);
    this._submitButton = document.querySelector(submitButtonSelector);
    this._formValidator = formValidator;

    this.setEventListeners();
  }

  setPicture(imageUrl) {
    this._profilePictureElement.src = imageUrl;
    this._profilePictureInput.value = imageUrl;
    console.log("Imagen de usuario establecida:", imageUrl);
  }

  getPicture() {
    const imageUrl = this._profilePictureInput.value;
    const submitButton = document.querySelector("#submit_imgProfile");

    // Cambiar el texto del botón a "GUARDANDO..."
    submitButton.textContent = "GUARDANDO...";
    this.setPicture(imageUrl);
    apiInstance
      .editUserPicture(imageUrl, "users/me/avatar")
      .then((result) => {
        console.log("Imagen guardada en el servidor:", result);
      })
      .catch((error) => {
        console.log("Error al guardar la imagen:", error);
      });

    // Cerrar el formulario después de 0.6 segundos
    setTimeout(() => {
      this.closeForm();
      // Cambiar el texto del botón de vuelta a "Guardar"
      submitButton.textContent = "GUARDAR";
    }, 600);
  }

  closeForm() {
    const popup = document.querySelector(".popup");
    this._profilePictureInput.value = "";
    this._formValidator.resetValidation();
    popup.classList.remove("open");
  }

  setEventListeners() {
    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.getPicture();
    });
  }
}

export default UserPicture;
