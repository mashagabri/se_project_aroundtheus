import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../scripts/Section.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import UserInfo from "../scripts/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";

// ----------------------- Variables ------------------------- //
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalForm = document.forms["profile-modal-form"];
const modalInputName = document.querySelector("[name='name']");
const modalInputDescription = document.querySelector("[name='description']");
const cardAddModalForm = document.forms["card-add-modal-form"];
const cardAddButton = document.querySelector("#card-add-button");
const allValidators = {};

// ----------------------- Functions ------------------------- //
function validateAllForms() {
  const allForms = Array.from(document.querySelectorAll(config.formSelector));
  allForms.forEach((form) => {
    const formValidator = new FormValidator(config, form);
    //get from form its id and put in the object by key(id) validator
    allValidators[form.getAttribute("id")] = formValidator;
    formValidator.enableValidation();
  });
}
validateAllForms();

// ---------------------------------------------------------------------- //
const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  aboutSelector: "#profile-description",
});

// ---------------------------------------------------------------------- //
// Cards container
const cardsContainerSelector = "#cards-list";
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      section.addItem(createCard(cardData));
    },
  },
  cardsContainerSelector
);

// ---------------------------------------------------------------------- //
// Edit profile Popup
const popupWithFormEdit = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    userInfo.setUserInfo({ name: formData.name, about: formData.description });
    popupWithFormEdit.close();
  }
);
popupWithFormEdit.setEventListeners();

// ---------------------------------------------------------------------- //
// Add card popup
const popupWithFormCard = new PopupWithForm("#card-add-modal", (formData) => {
  const cardData = { name: formData.title, link: formData.url };
  section.addItem(createCard(cardData));
  popupWithFormCard.close();
});
popupWithFormCard.setEventListeners();

// ---------------------------------------------------------------------- //
// Image popup
const popupWithImage = new PopupWithImage("#card-view-modal");
popupWithImage.setEventListeners();
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", (data) =>
    popupWithImage.open(data)
  );
  return card.generateCard();
}

section.renderItems();

// Edit profile Popup Listener
profileEditButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  modalInputName.value = name;
  modalInputDescription.value = about;
  allValidators[profileModalForm.id].resetValidation();
  popupWithFormEdit.open();
});

// Add Card Popup Listener
cardAddButton.addEventListener("click", () => {
  allValidators[cardAddModalForm.id].resetValidation();
  popupWithFormCard.open();
});
