import { deleteCardDromServer, likeThisCard, unlikeThisCard } from "./api";

// Card template
const cardTemplate = document.querySelector('#card-template').content;

//Create card function
function createCard(cardData, userId, onDelete, onLike, openImg) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikes = cardElement.querySelector('.card__like-counter');
  const card = cardElement;
  const cardId = cardData._id;

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikes.textContent = cardData.likes.length;

  if (userId !== cardData.owner._id) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => onDelete(card, cardId));
  };

  if (cardData.likes.some((like) => {
    return like._id === userId;
  })) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener('click', (evt) => {
    onLike(evt, cardId, cardLikes);
  })

  card.addEventListener('click', openImg);

  return cardElement;
};

//Delete card function
function deleteCard(card, cardId) {
  deleteCardDromServer(cardId)
    .catch((err) => {
      console.log(err)
    })
  card.remove()
};

//Like card function
function likeCard(evt, cardId, likesCounter) {
  const heart = evt.target;
  const likeMethod = heart.classList.contains("card__like-button_is-active") ? unlikeThisCard : likeThisCard;
  likeMethod(cardId)
    .then((data) => {
      heart.classList.toggle("card__like-button_is-active");
      likesCounter.textContent = data.likes.length;
    })
    .catch(err => console.log(err));
}

export { createCard, deleteCard, likeCard };