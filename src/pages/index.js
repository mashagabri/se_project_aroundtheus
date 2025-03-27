import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";
import Api from "../components/Api.js";

// ----------------------- Variables ------------------------- //
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalForm = document.forms["profile-modal-form"];
const modalInputName = document.querySelector("[name='name']");
const modalInputDescription = document.querySelector("[name='description']");
const cardAddModalForm = document.forms["card-add-modal-form"];
const cardAddButton = document.querySelector("#card-add-button");
const allValidators = {};

const inputIdCard = document.querySelector("#input-id-card");
const profilePicture = document.querySelector("#profile-picture");

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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4d5610aa-a9cf-4f23-a79a-7d38d9331c91",
    "Content-Type": "application/json",
  },
});

const resultPromise = api.getInitialCards();
resultPromise
  .then((cards) => {
    workWithSection(cards);
  })
  .catch((err) => {
    console.log(err);
  });

// ---------------------------------------------------------------------- //
const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  aboutSelector: "#profile-description",
  pictureSelector: "#profile-picture",
});

// ---------------------------------------------------------------------- //
// Cards container
const cardsContainerSelector = "#cards-list";

// ---------------------------------------------------------------------- //
// Edit profile Popup
const popupWithFormEdit = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    popupWithFormEdit.showLoadingButton();
    api
      .editUserInfo(formData.name, formData.description)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupWithFormEdit.close();
        popupWithFormEdit.showButton();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  "Save",
  "Saving",
  config.submitButtonSelector
);
popupWithFormEdit.setEventListeners();

// ---------------------------------------------------------------------- //
// Edit picture Popup
const popupWithFormEditPicture = new PopupWithForm(
  "#edit-picture-modal",
  (formData) => {
    popupWithFormEditPicture.showLoadingButton();
    api
      .updateProfilePicture(formData.url)
      .then((data) => {
        userInfo.setUserInfo(data);

        popupWithFormEditPicture.close();
        popupWithFormEditPicture.showButton();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  "Save",
  "Saving",
  config.submitButtonSelector
);

const editPictureModalForm = document.querySelector("#edit-picture-modal-form");
popupWithFormEditPicture.setEventListeners();

const editProfilePicture = document.querySelector("#avatar-edit-button");
editProfilePicture.addEventListener("click", () => {
  allValidators[editPictureModalForm.id].resetValidation();
  popupWithFormEditPicture.open();
});

function deleteCardPopup(card, data, cardData) {
  const popupWithFormCardDeletion = new PopupWithForm(
    "#card-delete-modal",
    (formData) => {
      const resultDeletePromise = api.deleteCard(formData.id_card);
      resultDeletePromise
        .then((res) => {
          card.deleteCardFromInterface();
          popupWithFormCardDeletion.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    "Yes",
    "",
    config.submitButtonSelector
  );
  popupWithFormCardDeletion.setEventListeners();

  inputIdCard.value = cardData._id;
  popupWithFormCardDeletion.open(data);
  inputIdCard.nextElementSibling.classList.remove(config.inactiveButtonClass);
  inputIdCard.nextElementSibling.disabled = false;
}

function toggleLikeAction(card) {
  console.log(card);
  if (card.isLiked) {
    api
      .removeLike(card.id)
      .then((data) => {
        if (!data.isLiked) {
          card.toggleLikeButton();
        }
      })
      .catch((er) => {
        console.log(er);
      });
  } else {
    api
      .addLike(card.id)
      .then((data) => {
        if (data.isLiked) {
          card.toggleLikeButton();
        }
      })
      .catch((er) => {
        console.log(er);
      });
  }
}

// ---------------------------------------------------------------------- //
// Image popup
const popupWithImage = new PopupWithImage("#card-view-modal");
popupWithImage.setEventListeners();
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    (data) => popupWithImage.open(data),
    (data) => {
      deleteCardPopup(card, data, cardData);
    },
    (data) => {
      toggleLikeAction(data);
    }
  );
  return card.generateCard();
}

// Edit profile Popup Listener
profileEditButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  modalInputName.value = name;
  modalInputDescription.value = about;
  allValidators[profileModalForm.id].resetValidation();
  popupWithFormEdit.open();
});

function workWithSection(cards) {
  const section = new Section(
    {
      items: cards,
      renderer: (cardData) => {
        section.addItem(createCard(cardData));
      },
    },
    cardsContainerSelector
  );
  section.renderItems();

  // Add card popup
  const popupWithFormCard = new PopupWithForm(
    "#card-add-modal",
    (formData) => {
      popupWithFormCard.showLoadingButton();
      api
        .addNewCard(formData.title, formData.url)
        .then((data) => {
          section.addItem(createCard(data));
          popupWithFormCard.close();
          popupWithFormCard.showButton();
          allValidators[cardAddModalForm.id].disableButton();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    "Create",
    "Creating",
    config.submitButtonSelector
  );
  popupWithFormCard.setEventListeners();

  // Add Card Popup Listener
  cardAddButton.addEventListener("click", () => {
    popupWithFormCard.open();
  });
}

function workWithUserInfo() {
  api
    .getUserInfo()
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
workWithUserInfo();
