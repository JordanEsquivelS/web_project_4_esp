/* Prettirer hace indentación y espaciado, segun los parametros que se dieron para todos los proyectos de Praticum*/

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

const gridContainer = document.getElementById("grid-container");
const cardTemplate = document.getElementById("card-template");
const likeButton = document.querySelectorAll(
  ".cards__card-like-button-container"
);

initialCards.forEach((card) => {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".photo-grid__image");
  const cardText = cardElement.querySelector(".photo-grid__text");

  cardImage.src = card.link;
  cardText.textContent = card.name;

  gridContainer.appendChild(cardElement);
});

function likeButtonActive(evt) {
  evt.target.classList.toggle("photo-grid__like_active");
}

likeButton.forEach((el) => {
  el.addEventListener("click", likeButtonActive);
});
