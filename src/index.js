import '../src/pages/index.css';
import { initialCards } from "./components/cards";
import { openModal, closeModal, closeModalEsc, closeModalX, closeModalOverlay } from './components/modal';
import { createCard, deleteCard, cardLike } from './components/card';

// DOM nodes
const cardsContainer = document.querySelector('.places__list');

//Show all cards
initialCards.forEach(function (elem) {
  cardsContainer.append(createCard(elem, deleteCard, cardLike, openImg));
});

//ALL POPUPS
//Close any popup on Х click
const allXButtons = document.querySelectorAll('.popup__close');

closeModalX(allXButtons);

//Close any popup on Esc
document.addEventListener('keydown', closeModalEsc);

//PROFILE POPUP
//PROFILE popup variables
const profileEditModal = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//Profile edit popup open
const profileEditBtn = document.querySelector('.profile__edit-button');
profileEditBtn.addEventListener('click', () => {
  openModal(profileEditModal);
});

//Profile edit popup close on overlay click
closeModalOverlay(profileEditModal);

//Profile form variables
const profileForm = document.forms.editForm;
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
nameInput.placeholder = profileTitle.textContent;
jobInput.placeholder = profileDescription.textContent;

// Profile form submit function
function profileFormSubmit(profileTitle, profileDescription, popup) {
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popup.classList.remove('popup_is-opened');
};

//Submit profile form
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileFormSubmit(profileTitle, profileDescription, profileEditModal)
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

//Close add card popup on overlay click
closeModalOverlay(newCardModal);

//Add new card function
function newCardFormSubmit(url, name) {
  const cardObj = {};
  cardObj.link = url.value;
  cardObj.name = name.value;
  return cardObj;
};

//Add new card
newCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(newCardFormSubmit(cardUrlInput, cardNameInput), deleteCard, cardLike, openImg));
  cardNameInput.value = '';
  cardUrlInput.value = '';
  newCardModal.classList.remove('popup_is-opened');
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
    imgModalCaption.textContent = evt.target.alt;
    openModal(imgModal);
  };
};

//Img popup close on overlay click
closeModalOverlay(imgModal);