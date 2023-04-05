const photoGridContainer = document.getElementById("grid-container");
const popupImagen = document.querySelector(".popImg");
const imagenGrande = document.querySelector(".popImg__imagenGrande");
const textoImagenGrande = document.querySelector(".popImg__text");
const cerrarImagen = document.querySelector(".popImg__cerrar");

photoGridContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("photo-grid__image")) {
    const titulo = event.target
      .closest(".photo-grid")
      .querySelector(".photo-grid__text").textContent;
    const src = event.target.getAttribute("src");

    imagenGrande.setAttribute("src", src);
    textoImagenGrande.textContent = titulo;
    popupImagen.classList.add("open");
  }
});

cerrarImagen.addEventListener("click", () => {
  popupImagen.classList.remove("open");
});
