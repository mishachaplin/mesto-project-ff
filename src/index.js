import '../src/pages/index.css';
// import { initialCards } from "./components/cards";
import { openModal, closeModal, setClosePopupByCrossListeners } from './components/modal';
import { createCard, deleteCard, likeCard } from './components/card';
import { enableValidation, clearValidation } from './components/validation';
import { getAllCards, getUserData, postNewCard, updateUserData } from './components/api';

// DOM nodes
const cardsContainer = document.querySelector('.places__list');

//Close any popup on Х click
const allXButtons = document.querySelectorAll('.popup__close');
setClosePopupByCrossListeners(allXButtons);

//PROFILE POPUP
//PROFILE popup variables
const profileEditModal = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

//Profile form variables
const profileForm = document.forms.editForm;
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const formError = profileForm.querySelector(`.${nameInput.id}-error`);

//Profile edit popup open
const profileEditBtn = document.querySelector('.profile__edit-button');
profileEditBtn.addEventListener('click', () => {
  openModal(profileEditModal);
  clearValidation(profileEditModal);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});


//ADD NEW CARD popup
//New card popup variables
const newCardModal = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms.addNewCard;
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = newCardForm.querySelector('.popup__input_type_url');
const newCardBtn = document.querySelector('.profile__add-button');

//Open add card popup
newCardBtn.addEventListener('click', () => {
  openModal(newCardModal);
  clearValidation(newCardModal);
});

//Combine new card data function
// function combineCardData(url, name) {
//   const cardData = {};
//   cardData.link = url.value;
//   cardData.name = name.value;
//   return cardData;
// };

//Add new card
// newCardForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   cardsContainer.prepend(createCard(combineCardData(cardUrlInput, cardNameInput), deleteCard, likeCard, openImg));
//   newCardForm.reset();
//   closeModal(newCardModal);
// });

const createNewCard = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardUrlInput.value
  };

  postNewCard(cardData)
    .then((data) => {
      cardsContainer.prepend(createCard(data, deleteCard, likeCard, openImg));
      newCardForm.reset();
      closeModal(newCardModal);
    })

    .catch((err) => {
      console.log(err)
    })
}

newCardForm.addEventListener('submit', createNewCard)


//IMAGE popup
//Image popup variables
const imgModal = document.querySelector('.popup_type_image');
const imgModalPic = document.querySelector('.popup__image');
const imgModalCaption = document.querySelector('.popup__caption');

//Image popup open function
function openImg(evt) {
  if (evt.target.classList.contains('card__image')) {
    imgModalPic.src = evt.target.src;
    imgModalPic.alt = evt.target.alt;
    imgModalCaption.textContent = evt.target.alt;
    openModal(imgModal);
  };
};


//FORM VALIDATION

enableValidation();


//API stuff

// Get user and card data
const getUserDataAndCards = () => {
return Promise.all([getUserData(), getAllCards()])
  .then(([userData, cardsData] ) => {
    profileTitle.textContent =  userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    cardsData.forEach((card) => {
    cardsContainer.append(createCard(card, deleteCard, likeCard, openImg))
    })
  })
  .catch((err) => {
    console.log(err)
  })
}

getUserDataAndCards();

// Profile form submit function
const submitProfileData = (evt) => {
  evt.preventDefault();

  updateUserData(nameInput.value, jobInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(profileEditModal)
    })

    .catch((err) => {
      console.log(err)
    })
}

profileForm.addEventListener('submit', submitProfileData)



// postNewCard(testCard)
// .then((data) => {
//   console.log(data);
// })