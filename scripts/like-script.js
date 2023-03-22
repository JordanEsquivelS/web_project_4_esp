let heartIcons = document.querySelectorAll(".photo-grid__like");

heartIcons.forEach(function (heartIcon) {
  heartIcon.addEventListener("click", function () {
    if (heartIcon.src.includes("/images/corazon_blanco.svg")) {
      heartIcon.src = "images/corazon_negro.svg";
    } else {
      heartIcon.src = "images/corazon_blanco.svg";
    }
  });
});
