// DOM узлы
const popupEdit = document.querySelector('.popup_type_edit'),
  profileEditForm = popupEdit.querySelector('.popup__form'),
  popupNewCard = document.querySelector('.popup_type_new-card'),
  addCardForm = popupNewCard.querySelector('.popup__form'),
  popupImageCard = document.querySelector('.popup_type_image'),
  popupEditImage = document.querySelector('.popup_type_edit-profile-image');

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
    image: document.querySelector('.profile__image'),
    popupEdit,
    editForm: profileEditForm,
    editFormSaveButton: popupEdit.querySelector('.popup__button'),
    nameInput: profileEditForm.querySelector('.popup__input_type_name'),
    jobInput: profileEditForm.querySelector('.popup__input_type_description'),
  },
  avatar = {
    popup: popupEditImage,
    form: popupEditImage.querySelector('.popup__form'),
    formSaveButton: popupEditImage.querySelector('.popup__button'),
    urlInput: popupEditImage.querySelector('.popup__input_type_url_image')
  },
  addNewCard = {
    popup: popupNewCard,
    form: addCardForm,
    formSaveButton: popupNewCard.querySelector('.popup__button'),
    nameInput: addCardForm.querySelector('.popup__input_type_card-name'),
    linkInput: addCardForm.querySelector('.popup__input_type_url'),
  },
  imageCard = {
    popup: popupImageCard,
    image: popupImageCard.querySelector('.popup__image'),
    caption: popupImageCard.querySelector('.popup__caption'),
  },
  validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  };
