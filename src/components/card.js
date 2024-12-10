import { deleteYourCard, likeThisCard, unlikeThisCard } from "./api";

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
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikes.textContent = cardData.likes.length;

  if(userId !== cardData.owner._id) {
    deleteButton.remove();
  };

  const card = cardElement;
  const cardId = cardData._id;
  deleteButton.addEventListener('click', () => onDelete(card, cardId));

  if(cardData.likes.some((like) => {
    return like._id === userId;
  })) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener('click', (evt) => {
    onLike(evt, cardId, cardLikes);
  })

  //card.addEventListener('click',() => onLike);
  card.addEventListener('click', openImg);

  return cardElement;
};


//Card delete function
function deleteCard(card, cardId) {
  deleteYourCard(cardId)
  .catch((err) => {
    console.log(err)
  })
  card.remove()
};

//Card like function
// function likeCard(evt) {
//   if (evt.target.classList.contains('card__like-button')) {
//     evt.target.classList.toggle('card__like-button_is-active');
//   };
// };


// function likeCard(evt, cardId, likesCounter) {

//   const cardLikeButton = evt.target.classList.contains();
//   const likeMethod = cardLikeButton.classList.contains('card__like-button_is-active') ? deleteThisLike : likeThisCard;
// likeMethod(cardId)
//   .then ((data) => {
//     likesCounter.textContent = data.likes.length;
//     cardLikeButton.classList.toggle('card__like-button_is-active');
// });
// };

function likeCard(evt, cardId, likesCounter) {
  const heart = evt.target;
  if (!heart.classList.contains("card__like-button_is-active")) {
    likeThisCard(cardId)
      .then((data) => {
        heart.classList.add("card__like-button_is-active");
        likesCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    unlikeThisCard(cardId)
      .then((data) => {
        heart.classList.remove("card__like-button_is-active");
        likesCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


export { createCard, deleteCard, likeCard };