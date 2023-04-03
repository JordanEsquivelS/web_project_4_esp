const lugarAgregar = document.querySelector(".profile__agregar");
const popupNuevoLugar = document.querySelector("#nuevo-lugar");

// Agregar un evento de click al botón "Agregar"
lugarAgregar.addEventListener("click", () => {
  popupNuevoLugar.classList.add("open");
});

// Agregar un evento de click al botón "Cerrar" dentro de la ventana emergente
const cerrarLugar = document.querySelector("#cerrarLugar");
cerrarLugar.addEventListener("click", () => {
  popupNuevoLugar.classList.remove("open");
});
