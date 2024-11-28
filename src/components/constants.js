// DOM узлы
const popupEdit = document.querySelector('.popup_type_edit'),
  profileEditForm = popupEdit.querySelector('.popup__form'),
  popupNewCard = document.querySelector('.popup_type_new-card'),
  addCardForm = popupNewCard.querySelector('.popup__form'),
  popupImageCard = document.querySelector('.popup_type_image');

export const container = document.querySelector('.places__list'),
  popups = document.querySelectorAll('.popup'),
  // Темплейт карточки
  template = document
    .querySelector('#card-template')
    .content.querySelector('.card'),
  profile = {
    addButton: document.querySelector('.profile__add-button'),
    editButton: document.querySelector('.profile__edit-button'),
    title: document.querySelector('.profile__title'),
    description: document.querySelector('.profile__description'),
    popupEdit,
    editForm: profileEditForm,
    nameInput: profileEditForm.querySelector('.popup__input_type_name'),
    jobInput: profileEditForm.querySelector('.popup__input_type_description'),
  },
  addNewCard = {
    popup: popupNewCard,
    form: addCardForm,
    nameInput: addCardForm.querySelector('.popup__input_type_card-name'),
    linkInput: addCardForm.querySelector('.popup__input_type_url'),
  },
  imageCard = {
    popup: popupImageCard,
    image: popupImageCard.querySelector('.popup__image'),
    caption: popupImageCard.querySelector('.popup__caption'),
  };
