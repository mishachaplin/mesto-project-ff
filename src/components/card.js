// Card template
const cardTemplate = document.querySelector('#card-template').content;

//Create card function
function createCard(cardData, onDelete, onLike, openImg) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const card = cardElement;
  deleteButton.addEventListener('click', () => onDelete(card));
  card.addEventListener('click', onLike);
  card.addEventListener('click', openImg);

  return cardElement;
};

//Card delete function
function deleteCard(card) {
  card.remove()
};

//Card like function
function cardLike(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  };
};

export { createCard, deleteCard, cardLike };