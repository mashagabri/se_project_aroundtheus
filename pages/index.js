import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
  errorClassVisible: "modal__error_visible",
};

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

// ----------------------- Card Variables ------------------------- //
const cardsList = document.querySelector("#cards-list");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddModalForm = document.forms["card-add-modal-form"];
const cardAddButton = document.querySelector("#card-add-button");
const cardViewModal = document.querySelector("#card-view-modal");
const cardImageTitle = cardAddModalForm.querySelector(
  ".modal__input_type_title"
);
const cardImageUrl = cardAddModalForm.querySelector(".modal__input_type_url");
const allModals = [cardAddModal, profileEditModal, cardViewModal];

const formEditValidator = new FormValidator(config, profileModalForm);
const formAddValidator = new FormValidator(config, cardAddModalForm);

formEditValidator.enableValidation();
formAddValidator.enableValidation();

// ----------------------- Functions ------------------------- //
function addOverlayListners() {
  allModals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });
}

addOverlayListners();
//handler variable that is carrying function which we added as listener
let escapeHandler;

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  //handler is the same memory which we use in addEventListener below
  document.removeEventListener("keydown", escapeHandler);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  escapeHandler = (event) => {
    //when we press any button we check which type is it
    if (event.key === "Escape") {
      closeModal(modal);
    }
  };
  //we add listener when keydown is pressed
  document.addEventListener("keydown", escapeHandler);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
}

function handleCardAddModalFormSubmit(e) {
  e.preventDefault();
  const name = cardImageTitle.value;
  const link = cardImageUrl.value;
  if (name && link) {
    renderCard({ name, link });
    closeModal(cardAddModal);
    formAddValidator.resetValidation();
  }
}

function handleProfileEditModalFormSubmit(e) {
  e.preventDefault();
  profileName.innerText = modalInputName.value;
  profileDescription.innerText = modalInputDescription.value;
  closeModal(profileEditModal);
}

// Profile Event Listeners //

profileEditButton.addEventListener("click", () => {
  modalInputName.value = profileName.innerText;
  modalInputDescription.value = profileDescription.innerText;
  formEditValidator.resetValidation();
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

const modalImage = document.querySelector(".modal__image");
const modalTitle = document.querySelector(".modal__title");
function handleImageClick(cardData) {
  // Устанавливаем ссылку на изображение
  modalImage.src = cardData._link;
  modalImage.alt = cardData._name;
  // Устанавливаем заголовок
  modalTitle.textContent = cardData._name;
  // открывает модальное окно.
  openModal(previewImageModal);
}
