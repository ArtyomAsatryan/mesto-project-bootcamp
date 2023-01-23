import { handleError, likeCard, dislikeCard, deleteServerCard } from "../components/api.js";
import { closePopup, openPopup } from '../components/modal.js';
import { popupDelete, popupImage, popupImg, popupTxt } from '../components/constants.js';
import { userId } from '../pages/index.js'

export let deletedServerCard = null;

export function createCard(card) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardNew = cardTemplate.querySelector('.place__element').cloneNode(true);
  const cardImage = cardNew.querySelector('.place__image');
  const cardDeleteButton = cardNew.querySelector('.place__trash-icon');
  const cardLikeButton = cardNew.querySelector('.place__like-icon');
  const likeCounter = cardNew.querySelector('.place__like-counter');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardNew.id = card._id;
  cardNew.querySelector('.place__title').textContent = card.name;
  likeCounter.textContent = card.likes.length;

  cardLikeButton.addEventListener('click', function () {
    if (cardLikeButton.classList.contains('place__like-icon_active')) {
      deleteLike(cardNew, cardLikeButton, likeCounter)
    } else {
      addLike(cardNew, cardLikeButton, likeCounter)
    }
  })
  for (let i = 0; i < card.likes.length; i++) {
    if (card.likes[i]._id === userId) {
      cardLikeButton.classList.add('place__like-icon_active');
    }
  }

  cardDeleteButton.addEventListener('click', function (event) {
    deletedServerCard = event.target.closest('.place__element')
    openPopup(popupDelete);
  })
  if (card.owner._id !== userId) {
    cardDeleteButton.remove()
  }

  cardImage.addEventListener('click', function () {
    popupImg.src = card.link;
    popupImg.alt = card.name;
    popupTxt.textContent = card.name;
    openPopup(popupImage);
  });

  return cardNew;
}

export function deleteCard(event) {
  event.preventDefault();
  return deleteServerCard(deletedServerCard.id)
    .then(function () {
      deletedServerCard.remove();
      closePopup(popupDelete);
      deletedServerCard = null;
    })
    .catch(handleError)
}

function addLike(cardNew, cardLikeButton, likeCounter) {
  return likeCard(cardNew.id)
    .then((card) => {
      cardLikeButton.classList.add('place__like-icon_active');
      likeCounter.textContent = card.likes.length;
    })
    .catch(handleError)
}

function deleteLike(cardNew, cardLikeButton, likeCounter) {
  return dislikeCard(cardNew.id)
    .then((card) => {
      cardLikeButton.classList.remove('place__like-icon_active');
      likeCounter.textContent = card.likes.length;
    })
    .catch(handleError)
}




























