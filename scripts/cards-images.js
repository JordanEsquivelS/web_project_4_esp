const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const photoGridContainer = document.getElementById("grid-container");

initialCards.forEach((card) => {
  const cardHTML = `
    <div class="photo-grid">
      <img class="photo-grid__image" src="${card.link}" />
      <img src="images/delete.svg" alt="imagen de tacho de basura blanco" class="photo-grid__delete">
      <div class="photo-grid__description">
        <p class="photo-grid__text">${card.name}</p>
        <img class="photo-grid__like" src="images/corazon_blanco.svg" alt="icono de like o corazon" />
      </div>
    </div>
  `;

  photoGridContainer.insertAdjacentHTML("beforeend", cardHTML);
});

