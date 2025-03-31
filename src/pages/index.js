import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { config } from "../utils/constants.js";
import Api from "../components/Api.js";

// ----------------------- Variables ------------------------- //
const allValidators = {};
const inputIdCard = document.querySelector(config.inputIdCardSelector);

// ----------------------- Functions ------------------------- //

//Adding all validations to all exist forms
function validateAllForms() {
  const allForms = Array.from(document.querySelectorAll(config.formSelector));
  allForms.forEach((form) => {
    const formValidator = new FormValidator(config, form);
    //get from form its id and put in the object by key(id) validator
    allValidators[form.getAttribute("id")] = formValidator;
    formValidator.enableValidation();
  });
}

//Appearing of delete popup and then deleting of card
function deleteCardPopup(card, data, cardData) {
  const popupWithFormDeleteCard = new PopupWithForm(
    "#card-delete-modal",
    (formData) => {
      const resultDeletePromise = api.deleteCard(formData.id_card);
      resultDeletePromise
        .then(() => {
          card.deleteCardFromInterface();
          popupWithFormDeleteCard.close();
          popupWithFormDeleteCard.reset();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    config.submitButtonSelector
  );
  popupWithFormDeleteCard.setEventListeners();
  popupWithFormDeleteCard.setInputValues({ id_card: cardData._id });
  popupWithFormDeleteCard.open(data);
  inputIdCard.nextElementSibling.classList.remove(config.inactiveButtonClass);
  inputIdCard.nextElementSibling.disabled = false;
}

//Like dislike switch
function toggleLikeAction(card) {
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

//Creating and generating card and pass 3 callbacks what to do with this card later
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

//Rendering all cards Section on the website
function workWithSection(cards) {
  const section = new Section(
    {
      items: cards,
      renderer: (cardData) => {
        section.addItem(createCard(cardData));
      },
    },
    config.cardsContainerSelector
  );
  section.renderItems();

  // Add card popup
  const popupWithFormAddCard = new PopupWithForm(
    "#card-add-modal",
    (formData) => {
      popupWithFormAddCard.renderLoading(true, "Creating...");
      api
        .addNewCard(formData.title, formData.url)
        .then((data) => {
          section.addItem(createCard(data));
          popupWithFormAddCard.close();
          allValidators[popupWithFormAddCard.getFormId()].disableButton();
          popupWithFormAddCard.reset();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormAddCard.renderLoading(false);
        });
    },
    config.submitButtonSelector
  );
  popupWithFormAddCard.setEventListeners();

  // Add Card Popup Listener
  document
    .querySelector(config.plusButtonSelector)
    .addEventListener("click", () => {
      popupWithFormAddCard.open();
    });
}

//Pass request to api and rendering user info
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

// ----------------------- Objects ------------------------- //
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4d5610aa-a9cf-4f23-a79a-7d38d9331c91",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  aboutSelector: "#profile-description",
  pictureSelector: "#profile-picture",
});

// loading all cards //
const resultPromise = api.getInitialCards();
resultPromise
  .then((cards) => {
    workWithSection(cards);
  })
  .catch((err) => {
    console.log(err);
  });

// ------------------------------Forms---------------------------------- //
// Edit profile Popup
const popupWithFormEditProfile = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    popupWithFormEditProfile.renderLoading(true);
    api
      .editUserInfo(formData.name, formData.description)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupWithFormEditProfile.close();
        popupWithFormEditProfile.reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormEditProfile.renderLoading(false);
      });
  },
  config.submitButtonSelector
);
popupWithFormEditProfile.setEventListeners();

// Edit picture Popup
const popupWithFormEditPicture = new PopupWithForm(
  "#edit-picture-modal",
  (formData) => {
    popupWithFormEditPicture.renderLoading(true);
    api
      .updateProfilePicture(formData.url)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupWithFormEditPicture.close();
        popupWithFormEditPicture.reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormEditPicture.renderLoading(false);
      });
  },
  config.submitButtonSelector
);
popupWithFormEditPicture.setEventListeners();

// Image popup
const popupWithImage = new PopupWithImage(config.cardViewModalSelector);
popupWithImage.setEventListeners();

// ---------------------------Add Listeners to buttons------------------------------- //

// Edit profile Popup Listener
document
  .querySelector(config.profileEditButtonSelector)
  .addEventListener("click", () => {
    const { name, about } = userInfo.getUserInfo();
    popupWithFormEditProfile.setInputValues({ name: name, description: about });
    allValidators[popupWithFormEditProfile.getFormId()].resetValidation();
    popupWithFormEditProfile.open();
  });

document
  .querySelector(config.avatarEditButtonSelector)
  .addEventListener("click", () => {
    allValidators[popupWithFormEditPicture.getFormId()].resetValidation();
    popupWithFormEditPicture.open();
  });

// --------------------------Call functions--------------------------- //
validateAllForms();
workWithUserInfo();
