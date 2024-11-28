import { template } from './constants';

// Функция создания карточки
export function createCard(item, { openImage, deleteCard, likeCard }) {
  const cardElementCopy = template.cloneNode(true),
    cardTitle = cardElementCopy.querySelector('.card__title'),
    cardImage = cardElementCopy.querySelector('.card__image'),
    deleteButton = cardElementCopy.querySelector('.card__delete-button'),
    likeButton = cardElementCopy.querySelector('.card__like-button');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  deleteButton.addEventListener('click', () => deleteCard(cardElementCopy));
  cardImage.addEventListener('click', () => openImage(cardImage));
  likeButton.addEventListener('click', () => likeCard(likeButton));

  return cardElementCopy;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// установка/удаление лайка
export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
