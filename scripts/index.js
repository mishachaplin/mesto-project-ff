// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const places = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard(cardData, removeCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', removeCard);

  return cardElement;
};

// @todo: Функция удаления карточки

function removeCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach(function (elem) {
  places.append(addCard(elem, removeCard));
});
