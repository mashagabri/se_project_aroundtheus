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

// ----------------------- Profile Variables ------------------------- //
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const profileEditButton = document.querySelector("#profile-edit-button");

// ----------------------- Modal Variables ------------------------- //
const previewImageModal = document.querySelector("#card-view-modal");
const profileModalForm = document.forms["profile-modal-form"];
const modalInputName = document.querySelector("[name='title']");
const modalInputDescription = document.querySelector("[name='description']");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const imageModalCloseButton = previewImageModal.querySelector(".modal__close");
const modalImage = document.querySelector(".modal__image");
const modalTitle = document.querySelector(".modal__title");

// ----------------------- Card Variables ------------------------- //
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector("#cards-list");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddModalForm = document.forms["card-add-modal-form"];
const cardAddButton = document.querySelector("#card-add-button");
const cardAddModalCloseButton = cardAddModal.querySelector(".modal__close");
const cardImageTitle = cardAddModalForm.querySelector(
  ".modal__input_type_title"
);
const cardImageUrl = cardAddModalForm.querySelector(".modal__input_type_url");
const allModals = [cardAddModal, profileEditModal];

// ----------------------- Functions ------------------------- //
function addAllListenersToModals() {
  allModals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });
}

addAllListenersToModals();
let handler;

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handler);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  handler = (event) => {
    if (event.key === "Escape") {
      closeModal(modal);
    }
  };
  document.addEventListener("keydown", handler);
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
}

function handleCardAddModalFormSubmit(e) {
  e.preventDefault();
  const name = cardImageTitle.value;
  const link = cardImageUrl.value;
  if (name && link) {
    renderCard({ name, link });
    closeModal(cardAddModal);
  }
}

function handleProfileEditModalFormSubmit(e) {
  e.preventDefault();
  profileName.innerText = modalInputName.value;
  profileDescription.innerText = modalInputDescription.value;
  closeModal(profileEditModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const card = cardElement.querySelector("#card");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    card.remove();
  });

  cardImage.addEventListener("click", () => {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    modalTitle.innerText = cardData.name;
    openModal(previewImageModal);
  });

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  return cardElement;
}

// Profile Event Listeners //

profileEditButton.addEventListener("click", () => {
  modalInputName.value = profileName.innerText;
  modalInputDescription.value = profileDescription.innerText;
  openModal(profileEditModal);
});

profileModalForm.addEventListener("submit", handleProfileEditModalFormSubmit);

// Card Event Listeners //

cardAddButton.addEventListener("click", () => openModal(cardAddModal));
cardAddModalForm.addEventListener("submit", handleCardAddModalFormSubmit);

// Find all close buttons
const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((closeButton) => {
  // Find the closest popup only once
  const popup = closeButton.closest(".modal");
  // Set the listener
  closeButton.addEventListener("click", () => closeModal(popup));
});

initialCards.forEach((cardData) => renderCard(cardData));
