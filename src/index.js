import '../src/pages/index.css';
import { openModal, closeModal, setClosePopupByCrossListeners } from './components/modal';
import { createCard, deleteCard, likeCard } from './components/card';
import { enableValidation, clearValidation } from './components/validation';
import { config } from './components/validationConfig';
import { getCardsData, getUserData, postNewCard, updateUserData, updateAvatar } from './components/api';

//DOM nodes
const cardsContainer = document.querySelector('.places__list');

//Get user and card data
let userId;
const getUserDataAndCards = () => {
  return Promise.all([getUserData(), getCardsData()])
    .then(([userData, cardsData]) => {
      userId = userData._id;
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = `url(${userData.avatar})`;

      cardsData.forEach((card) => {
        cardsContainer.append(createCard(card, userId, deleteCard, likeCard, openImg))
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

getUserDataAndCards();

//Close any popup on Х click
const allXButtons = document.querySelectorAll('.popup__close');
setClosePopupByCrossListeners(allXButtons);

//PROFILE
const profileEditModal = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileForm = document.forms.editForm;
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const avatarModal = document.querySelector('.popup_type_avatar');
const newAvatarForm = document.forms.avatarUpdate;
const avatarUrlInput = newAvatarForm.querySelector('.popup__input_type_avatar-url');
const updAvatarBtn = document.querySelector('.profile__image-overlay');
const avatarImage = document.querySelector('.profile__image');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileSubmitBtn = profileEditModal.querySelector('.popup__button');
const avatarSubmitBtn = avatarModal.querySelector('.popup__button');

//Profile edit popup open
profileEditBtn.addEventListener('click', () => {
  openModal(profileEditModal);
  clearValidation(profileEditModal, config);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Profile form submit
const submitProfileData = (evt) => {
  evt.preventDefault();
  serverLoading(profileSubmitBtn, true);
  updateUserData(nameInput.value, jobInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(profileEditModal)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      serverLoading(profileSubmitBtn, false)
    }) 
}

profileForm.addEventListener('submit', submitProfileData);

//Profile picture update
updAvatarBtn.addEventListener('click', () => {
  openModal(avatarModal);
  clearValidation(avatarModal, config);
});

newAvatarForm.addEventListener('submit', () => {
  serverLoading(avatarSubmitBtn, true);
  updateAvatar(avatarUrlInput.value)
    .then((data) => {
      avatarImage.style.backgroundImage = `url(${data.avatar}`;
      newAvatarForm.reset();
      closeModal(avatarModal);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      serverLoading(avatarSubmitBtn, false)
    }) 
});

//NEW CARD
const newCardModal = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms.addNewCard;
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = newCardForm.querySelector('.popup__input_type_url');
const newCardBtn = document.querySelector('.profile__add-button');
const cardSubmitBtn = newCardModal.querySelector('.popup__button');

//Open add card modal
newCardBtn.addEventListener('click', () => {
  openModal(newCardModal);
  clearValidation(newCardModal, config);
});

//Add new card
const createNewCard = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardUrlInput.value
  };
  serverLoading(cardSubmitBtn, true);

  postNewCard(cardData)
    .then((data) => {
      cardsContainer.prepend(createCard(data, userId, deleteCard, likeCard, openImg));
      newCardForm.reset();
      closeModal(newCardModal);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      serverLoading(cardSubmitBtn, false);
    }) 
}

newCardForm.addEventListener('submit', createNewCard);

//IMAGES
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
enableValidation(config);

//Loading function
function serverLoading(submitBtn, isLoading) {
    submitBtn.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};