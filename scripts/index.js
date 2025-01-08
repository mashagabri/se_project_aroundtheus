const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modalEditCloseButton = profileEditModal.querySelector("#modal-close");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const modalInputName = document.querySelector("[name='title']");
const modalInputDescription = document.querySelector("[name='description']");
const profileForm = document.forms["profile-modal-form"];
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector("#cards-list");

function closeModal() {
  profileEditModal.classList.remove("modal_opened");
}

profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
  modalInputName.value = profileName.innerText;
  modalInputDescription.value = profileDescription.innerText;
});

modalEditCloseButton.addEventListener("click", () => {
  closeModal();
});

function handleModalFormSubmit(e) {
  e.preventDefault();
  profileName.innerText = modalInputName.value;
  profileDescription.innerText = modalInputDescription.value;
  closeModal();
}

profileForm.addEventListener("submit", handleModalFormSubmit);

function getCardElement(cardData) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = cardData.name;
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.appendChild(cardElement);
});
