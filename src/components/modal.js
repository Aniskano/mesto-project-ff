function closeEsc(event) {
  if (event.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    closeModal(openedModal);
  }
}
export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc);
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc);
}
