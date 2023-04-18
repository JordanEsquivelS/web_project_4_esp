const photoGridContainer = document.getElementById("grid-container");
const popupImagen = document.querySelector(".popImg");
const bigImage = document.querySelector(".popImg__bigImage");
const textImageLarge = document.querySelector(".popImg__text");
const closeImage = document.querySelector(".popImg__close");

photoGridContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("photo-grid__image")) {
    const title = event.target
      .closest(".photo-grid")
      .querySelector(".photo-grid__text").textContent;
    const src = event.target.getAttribute("src");

    bigImage.setAttribute("src", src);
    textImageLarge.textContent = title;
    popupImagen.classList.add("open");
  }
});

closeImage.addEventListener("click", () => {
  popupImagen.classList.remove("open");
});
