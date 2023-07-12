/* PopupWithForm.js */

import Popup from "./popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback, formValidator) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".popup__form");
    this._formValidator = formValidator;
  }

  _getInputValues() {
    const inputElements = this._form.querySelectorAll(".popup__input");
    const values = {};
    inputElements.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset(); // Resetear el formulario al cerrar el popup
    // Verificar si el formulario tiene un validador antes de llamar a resetValidation
    if (this._formValidator) {
      this._formValidator.resetValidation(); // Resetear la validación del formulario
    }
  }
}

export default PopupWithForm;
