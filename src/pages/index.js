import '../pages/index.css';
import { formSelectors, enableValidation } from "../components/validate.js";
import { openPopup, closePopup } from '../components/modal.js';
import { initialCards } from '../components/card.js';

// Вынесем все необходимые элементы формы в константы

export const profile = document.querySelector('.profile');
export const editButton = profile.querySelector('.profile__edit-button');
export const addButton = profile.querySelector('.profile__add-button');

export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_add');
export const popupImage = document.querySelector('.popup_type_image');
export const popupEditClose = popupEdit.querySelector('.popup__close-icon');
export const popupAddClose = popupAdd.querySelector('.popup__close-icon');
export const popupImageClose = popupImage.querySelector('.popup__close-icon');

export const formProfile = popupEdit.querySelector('.form');
export const userNameInput = formProfile.querySelector('#user-name');
export const userJobInput = formProfile.querySelector('#user-job');

export const formCard = popupAdd.querySelector('.form');
export const placeNameInput = formCard.querySelector('#place-name');
export const placeImgInput = formCard.querySelector('#place-img');

export const profileTitle = profile.querySelector('.profile__title');
export const profileSubtitle = profile.querySelector('.profile__subtitle');

export const cardsList = document.querySelector('.place__elements');
export const cardTemplate = document.querySelector('.card-template').content;

export const imageElement = popupImage.querySelector('.opened-image__image');
export const imageCaption = popupImage.querySelector('.opened-image__caption');

export const popups = document.querySelectorAll('.popup')




// Открытие и закрытие модального окна с картинкой

export function handlePreviewImage(popupImageData) {
  openPopup(popupImage);

  imageElement.src = popupImageData.link;
  imageElement.alt = popupImageData.name;
  imageCaption.textContent = popupImageData.name;
}

popupImageClose.addEventListener('click', () => {
  closePopup(popupImage);
});

// Функции создания и добавления карточек

function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const elementImage = cardElement.querySelector('.place__image');
  const elementTitle = cardElement.querySelector('.place__title');
  const likeButton = cardElement.querySelector('.place__like-icon');
  const trashButton = cardElement.querySelector('.place__trash-icon');

  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;
  elementTitle.textContent = cardData.name;

  likeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('place__like-icon_active');
  });

  trashButton.addEventListener('click', evt => {
    evt.target.closest('.place__element').remove();
  });

  elementImage.addEventListener('click', evt => {
    const targetImage = evt.target;

    const cardData = {
      name: targetImage.alt,
      link: targetImage.src
    };

    handlePreviewImage(cardData);
  });

  return cardElement;
}

function addCard(cardData, cardContainer, newCard) {
  const card = createCard(cardData);

  if (newCard) {
    cardContainer.prepend(card);
  } else {
    cardContainer.append(card);
  }
}

// Карточки из коробки

initialCards.forEach(item => {
  addCard(item, cardsList, false);
});

// Модальное окно редактирования профиля

editButton.addEventListener('click', () => {
  openPopup(popupEdit);

  userNameInput.value = profileTitle.textContent;
  userJobInput.value = profileSubtitle.textContent;
});

popupEditClose.addEventListener('click', () => {
  closePopup(popupEdit);
});


// Отправка формы редактирования профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = userNameInput.value;
  profileSubtitle.textContent = userJobInput.value;

  closePopup(popupEdit);

}

formProfile.addEventListener('submit', handleProfileFormSubmit);

// Модальное окно добавления карточки

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

popupAddClose.addEventListener('click', () => {
  closePopup(popupAdd);
});

// Отправка формы добавления карточки

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  addCard({
    name: placeNameInput.value,
    link: placeImgInput.value
  }, cardsList, true);

  closePopup(popupAdd);

  formCard.reset();
}

formCard.addEventListener('submit', handleCardFormSubmit);

enableValidation(formSelectors);







