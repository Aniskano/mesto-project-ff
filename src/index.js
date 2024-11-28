import './pages/index.css';

import { createCard, deleteCard, likeCard } from './components/card.js';
import { initialCards } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';
import { container, popups, profile, addNewCard, imageCard } from './components/constants.js';

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

// Profile
profile.editButton.addEventListener('click', function () {
  profile.nameInput.value = profile.title.textContent;
  profile.jobInput.value = profile.description.textContent;

  openModal(profile.popupEdit);
});

function handleProfileEditSubmit(event) {
  event.preventDefault();

  profile.title.textContent = profile.nameInput.value;
  profile.description.textContent = profile.jobInput.value;

  closeModal(profile.popupEdit);
}

profile.editForm.addEventListener('submit', handleProfileEditSubmit);

// Add new card
profile.addButton.addEventListener('click', () => openModal(addNewCard.popup));

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  renderCard({
    name: addNewCard.nameInput.value,
    link: addNewCard.linkInput.value,
  });
  closeModal(addNewCard.popup);
  addNewCard.form.reset();
}

addNewCard.form.addEventListener('submit', handleAddCardFormSubmit);

// Image popup
function openImage(image) {
  imageCard.image.src = image.src;
  imageCard.image.alt = image.alt;
  imageCard.caption.textContent = image.alt;

  openModal(imageCard.popup);
}

// Вывести карточки на страницу
function renderCard(card) {
  const cardToAdd = createCard(card, { openImage, deleteCard, likeCard });
  container.prepend(cardToAdd);
}

initialCards.forEach(renderCard);
