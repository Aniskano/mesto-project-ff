import { template } from './constants';
import { deleteCard, likeCard, unlikeCard } from './api.js';

function renderLikes(cardElement, likes) {
  const likeButton = cardElement.querySelector('.card__like-button'),
    likeCount = cardElement.querySelector('.card__like-count'),
    method = hasUserLike(likes) ? 'add' : 'remove';

  likeCount.textContent = likes.length;
  likeButton.classList[method]('card__like-button_is-active');
}

const hasUserLike = (likes) =>
  likes.some(({ _id }) => _id === globalThis.userData._id);

// Функция создания карточки
export function createCard({ data, openImage }) {
  const cardElement = template.cloneNode(true),
    cardTitle = cardElement.querySelector('.card__title'),
    cardImage = cardElement.querySelector('.card__image'),
    likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  renderLikes(cardElement, data.likes);

  if (globalThis.userData._id === data.owner._id) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.classList.add('card__delete-button_visible');
    deleteButton.addEventListener('click', () =>
      handleDeleteCard(data._id, cardElement)
    );
  }

  cardImage.addEventListener('click', () => openImage(cardImage));
  likeButton.addEventListener('click', () => handleLikeCard(data, cardElement));

  return cardElement;
}

// Функция удаления карточки
async function handleDeleteCard(id, cardElement) {
  const confirmed = confirm('Вы действительно хотите удалить карточку?');

  if (!confirmed) {
    console.warn(`Удаление карточки с id ${id} отменено.`);
    return;
  }

  try {
    const { message } = await deleteCard(id);
    cardElement.remove();
    console.log(`%c${message}`, 'color: green');
  } catch (error) {
    console.error('Произошла ошибка при удалении карточки:', error);
  }
}

// установка/удаление лайка
async function handleLikeCard(data, cardElement) {
  try {
    const { likes } = hasUserLike(data.likes)
      ? await unlikeCard(data._id)
      : await likeCard(data._id);
    data.likes = likes;
    renderLikes(cardElement, likes);
  } catch (error) {
    const actionMessage = hasUserLike ? 'удалении лайка с' : 'лайке';
    console.error(`Произошла ошибка при ${actionMessage} карточки:`, error);
  }
}
