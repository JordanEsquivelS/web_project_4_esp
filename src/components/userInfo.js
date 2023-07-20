import apiInstance from "../components/api.js";
const Swal = window.Sweetalert2;

class UserInfo {
  constructor(
    nameSelector,
    professionSelector,
    nameInput,
    professionInput,
    submitButton,
    formValidator
  ) {
    this._nameElement = document.querySelector(nameSelector);
    this._professionElement = document.querySelector(professionSelector);
    this._nameInput = document.querySelector(nameInput);
    this._professionInput = document.querySelector(professionInput);
    this._submitButton = document.querySelector(submitButton);
    this._formValidator = formValidator;

    this.setEventListeners();
  }

  setUserInfo(name, about) {
    this._nameElement.textContent = name;
    this._professionElement.textContent = about;
    this._nameInput.value = name;
    this._professionInput.value = about;
    console.log("Datos del usuario establecidos:", name, about);
  }

  getUserInfo() {
    const name = this._nameInput.value;
    const profession = this._professionInput.value;

    if (
      name.trim() === "" ||
      !/^[a-zA-Z\s\u00C0-\u017FáéíóúÁÉÍÓÚüÜñÑ.,]*$/.test(name.trim())
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Asegúrate de que el campo de nombre solo contenga letras, acentos y punto.",
      });
      return;
    }

    this._nameElement.textContent = name;
    this._professionElement.textContent = profession;
    // Ejecutar la solicitud PATCH utilizando la instancia de Api
    apiInstance
      .editUserInfo(name, profession, "users/me")
      .then((result) => {
        console.log("Datos guardados en el servidor:", result);
      })
      .catch((error) => {
        console.log("Error al guardar los datos:", error);
      });
  }

  setEventListeners() {
    this._submitButton.addEventListener("click", (evt) => {
      this.getUserInfo();
    });
  }
}

export default UserInfo;
