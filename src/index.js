import './pages/index.css';

import { createCard } from './components/card.js';
import {
  container,
  popups,
  profile,
  addNewCard,
  imageCard,
  avatar,
  validationConfig,
} from './components/constants.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getCards,
  getUserData,
  addCard,
  updateUserData,
  updateUserAvatar,
} from './components/api.js';

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', (event) => {
    if (
      event.target === event.currentTarget ||
      event.target.classList.contains('popup__close')
    ) {
      closeModal(popup);
    }
  });
});

function setLoading(element, loading) {
  element.textContent = loading ? 'Сохранение...' : 'Сохранить';
}

// Profile
profile.editButton.addEventListener('click', function () {
  clearValidation(profile.editForm, validationConfig);

  profile.nameInput.value = profile.title.textContent;
  profile.jobInput.value = profile.description.textContent;

  // вызываем событие input для повторной валидации
  const event = new InputEvent('input', { inputType: 'insertText' });
  profile.nameInput.dispatchEvent(event);
  profile.jobInput.dispatchEvent(event);

  openModal(profile.popupEdit);
});

async function handleProfileEditSubmit(event) {
  event.preventDefault();
  try {
    setLoading(profile.editFormSaveButton, true);
    const userData = await updateUserData({
      name: profile.nameInput.value,
      about: profile.jobInput.value,
    });
    updateUserInfo(userData);
  } catch (error) {
    console.error('Ошибка при редактировании профиля:', error);
  } finally {
    setLoading(profile.editFormSaveButton, false);
    profile.editForm.reset();
    closeModal(profile.popupEdit);
  }
}

function updateUserInfo(userData) {
  globalThis.userData = userData;
  profile.title.textContent = userData.name;
  profile.description.textContent = userData.about;
  profile.image.style.backgroundImage = `url(${userData.avatar})`;
}

profile.editForm.addEventListener('submit', handleProfileEditSubmit);

// Avatar
profile.image.addEventListener('click', function () {
  clearValidation(avatar.form, validationConfig);
  openModal(avatar.popup);
});

async function handleEditProfileImageSubmit(event) {
  event.preventDefault();
  try {
    setLoading(avatar.formSaveButton, true);
    const userData = await updateUserAvatar(avatar.urlInput.value);
    updateUserInfo(userData);
    closeModal(avatar.popup);
    avatar.form.reset();
  } catch (error) {
    console.error('Ошибка при редактировании аватара профиля:', error);
  } finally {
    setLoading(avatar.formSaveButton, false);
  }
}

avatar.form.addEventListener('submit', handleEditProfileImageSubmit);

// Add new card
profile.addButton.addEventListener('click', () => openModal(addNewCard.popup));

async function handleAddCardFormSubmit(event) {
  event.preventDefault();
  try {
    setLoading(addNewCard.formSaveButton, true);
    const data = await addCard({
      name: addNewCard.nameInput.value,
      link: addNewCard.linkInput.value,
    });
    renderCard(data, false);
    closeModal(addNewCard.popup);
    addNewCard.form.reset();
    clearValidation(addNewCard.form, validationConfig);
  } catch (error) {
    console.error('Ошибка при создании карточки:', error);
  } finally {
    setLoading(addNewCard.formSaveButton, false);
  }
}

addNewCard.form.addEventListener('submit', handleAddCardFormSubmit);

// Image popup
function openImage(image) {
  imageCard.image.src = image.src;
  imageCard.image.alt = image.alt;
  imageCard.caption.textContent = image.alt;

  openModal(imageCard.popup);
}

// Отрисовать карточку на странице
function renderCard(data, afterContent = true) {
  const cardToAdd = createCard({ data, openImage }),
    method = afterContent ? 'append' : 'prepend';

  container[method](cardToAdd);
}

// Отрисовать карточки
function renderCards(cards) {
  cards.forEach(renderCard);
}

// Валидация
enableValidation(validationConfig);

Promise.all([getCards(), getUserData()])
  .then(([cards, userData]) => {
    updateUserInfo(userData);
    renderCards(cards);
  })
  .catch(console.error);
