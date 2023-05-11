class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".photo-grid");
    return cardTemplate.cloneNode(true);
  }

  _setEventListeners(cardElement) {
    const likeButton = cardElement.querySelector(".photo-grid__like");

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("photo-grid__like_active");
    });
  }

  _fillCardData(cardElement) {
    cardElement.querySelector(".photo-grid__image").src = this._data.link;
    cardElement.querySelector(".photo-grid__image").alt = this._data.name;
    cardElement.querySelector(".photo-grid__text").textContent =
      this._data.name;
  }

  createCard() {
    const cardElement = this._getTemplate();
    this._fillCardData(cardElement);
    this._setEventListeners(cardElement);
    return cardElement;
  }
}

export default Card;
