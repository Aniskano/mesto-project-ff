// Темплейт карточки
const template = document
  .querySelector('#card-template')
  .content.querySelector('.card');

// DOM узлы
const container = document.querySelector('.places__list');

// Функция создания карточки
function createCard(item, { deleteCard }) {
  const cardElementCopy = template.cloneNode(true),
    cardTitle = cardElementCopy.querySelector('.card__title'),
    cardImage = cardElementCopy.querySelector('.card__image'),
    deleteButton = cardElementCopy.querySelector('.card__delete-button');

  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  cardImage.alt = item.name;

  deleteButton.addEventListener('click', () => deleteCard(cardElementCopy));

  return cardElementCopy;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Вывести карточки на страницу
function addCard(card) {
  const cardToAdd = createCard(card, { deleteCard });
  container.prepend(cardToAdd);
}

initialCards.forEach(addCard);
