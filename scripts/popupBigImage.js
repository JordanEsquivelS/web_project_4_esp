const photoGridContainer = document.getElementById("grid-container");
const popupImagen = document.querySelector(".popImg");
const bigImage = document.querySelector(".popImg__bigImage");
const textImageLarge = document.querySelector(".popImg__text");
const closeImage = document.querySelector(".popImg__close");

function openPopup(title, src) {
  bigImage.setAttribute("src", src);
  textImageLarge.textContent = title;
  popupImagen.classList.add("open");
}

function closePopup() {
  popupImagen.classList.remove("open");
}

function handleKeyPress(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

photoGridContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("photo-grid__image")) {
    const title = event.target
      .closest(".photo-grid")
      .querySelector(".photo-grid__text").textContent;
    const src = event.target.getAttribute("src");

    openPopup(title, src);
  }
});

closeImage.addEventListener("click", closePopup);

document.addEventListener("keydown", handleKeyPress);

popupImagen.addEventListener("click", closePopup);