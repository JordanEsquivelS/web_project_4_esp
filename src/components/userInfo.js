/*UserInfo.js */
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

  setUserInfo() {
    this._nameInput.value = this._nameElement.textContent;
    this._professionInput.value = this._professionElement.textContent;
  }

  getUserInfo() {
    const name = this._nameInput.value;
    const profession = this._professionInput.value;

    if (name.trim() === "" || !/^[a-zA-Z\s\u00C0-\u017F]*$/.test(name.trim())) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Asegúrate de que el campo de nombre solo contenga letras.",
      });
      return;
    }

    this._nameElement.textContent = name;
    this._professionElement.textContent = profession;
    this.closeForm();
  }

  closeForm() {
    const popup = document.querySelector(".popup");
    popup.classList.remove("open");
    this._formValidator.resetValidation(); // Restablecer la validación del formulario
  }

  setEventListeners() {
    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.getUserInfo();
      this.closeForm();
    });
  }
}

export default UserInfo;
