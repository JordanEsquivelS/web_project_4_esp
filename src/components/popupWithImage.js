/*PopupWithImage.js */
import Popup from "./popup.js";
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.bigImage = document.querySelector(".popImg__bigImage");
    this.textImageLarge = document.querySelector(".popImg__text");
    this.closeImage = document.querySelector(".popImg__close");
  }

  open(title, src, alt) {
    this.bigImage.setAttribute("src", src);
    this.bigImage.setAttribute("alt", alt);
    this.textImageLarge.textContent = title;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("mousedown", (event) => {
      if (event.target === this._popup) {
        this.close();
      }
    });
  }
}
export default PopupWithImage;
