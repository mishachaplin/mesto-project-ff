// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const card = cardElement;
  deleteButton.addEventListener('click', () => deleteCard(card));

  return cardElement;
};

// @todo: Функция удаления карточки

function deleteCard(card) {
  card.remove()
};

// @todo: Вывести карточки на страницу

initialCards.forEach(function (elem) {
  cardsContainer.append(createCard(elem, deleteCard));
});