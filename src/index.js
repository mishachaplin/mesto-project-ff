import '../src/pages/index.css';
import { initialCards } from "./components/cards";
import { openModal, closeModal, setClosePopupByCrossListeners } from './components/modal';
import { createCard, deleteCard, likeCard } from './components/card';

// DOM nodes
const cardsContainer = document.querySelector('.places__list');

//Show all cards
initialCards.forEach(function (elem) {
  cardsContainer.append(createCard(elem, deleteCard, likeCard, openImg));
});

//Close any popup on Х click
const allXButtons = document.querySelectorAll('.popup__close');
setClosePopupByCrossListeners(allXButtons);

//PROFILE POPUP
//PROFILE popup variables
const profileEditModal = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//Profile form variables
const profileForm = document.forms.editForm;
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

//Profile edit popup open
const profileEditBtn = document.querySelector('.profile__edit-button');
profileEditBtn.addEventListener('click', () => {
  openModal(profileEditModal);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Profile form submit function
function submitProfileForm(profileTitle, profileDescription, popup) {
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popup);
};

//Submit profile form
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitProfileForm(profileTitle, profileDescription, profileEditModal)
});

//ADD NEW CARD popup
//New card popup variables
const newCardModal = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms.addNewCard;
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = newCardForm.querySelector('.popup__input_type_url');

//Open add card popup
const newCardBtn = document.querySelector('.profile__add-button');
newCardBtn.addEventListener('click', () => {
  openModal(newCardModal);
});

//Combine new card data function
function combineCardData(url, name) {
  const cardData = {};
  cardData.link = url.value;
  cardData.name = name.value;
  return cardData;
};

//Add new card
newCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(combineCardData(cardUrlInput, cardNameInput), deleteCard, likeCard, openImg));
  newCardForm.reset();
  closeModal(newCardModal);
});

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