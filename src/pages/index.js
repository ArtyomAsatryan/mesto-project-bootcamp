import '../pages/index.css';

import {
  popups, popupAvatar, popupEdit, popupAdd, profileAvatar, buttonOpenEdit, buttonOpenAdd,
  formAvatar, formEdit, formAdd, userName, userAbout, inputUserName, inputUserAbout,
  inputAvatarUrl, inputPlaceName, inputPlaceUrl, cardsContainer, formDelete, mestoSelectors
} from '../components/constants.js';
import { createCard, deleteCard } from '../components/card.js';
import { revalidateForm, enableValidation } from '../components/validate.js';
import { closePopup, openPopup } from '../components/modal.js';
import {
  getServerUserData, getServerInitialCards,
  patchUserAvatar, patchUserData, postNewCard, handleError
} from '../components/api.js';
import { renderLoading } from '../components/utils.js'

export let userId;

profileAvatar.addEventListener('click', openPopupAvatar);
buttonOpenEdit.addEventListener('click', openPopupEdit);
buttonOpenAdd.addEventListener('click', openPopupAdd);
formAvatar.addEventListener('submit', submitFormAvatar);
formEdit.addEventListener('submit', submitFormEdit);
formAdd.addEventListener('submit', submitFormAdd);
formDelete.addEventListener('submit', deleteCard);

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (event.target.classList.contains('popup__close-icon')) {
      closePopup(popup)
    }
  })
})

function submitFormAvatar(event) {
  event.preventDefault();
  renderLoading(true, event.submitter);
  patchUserAvatar(inputAvatarUrl.value)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    })
    .then(() => closePopup(popupAvatar))
    .catch(handleError)
    .finally(() => { renderLoading(false, event.submitter) })
}

function submitFormEdit(event) {
  event.preventDefault();
  renderLoading(true, event.submitter)
  patchUserData(inputUserName.value, inputUserAbout.value)
    .then((userData) => {
      userName.textContent = userData.name;
      userAbout.textContent = userData.about;
    })
    .then(() => closePopup(popupEdit))
    .catch(handleError)
    .finally(() => { renderLoading(false, event.submitter) })
}

function submitFormAdd(event) {
  event.preventDefault();
  renderLoading(true, event.submitter)
  postNewCard(inputPlaceName.value, inputPlaceUrl.value)
    .then((cards) => {
      cardsContainer.prepend(createCard(cards));
    })
    .then(() => closePopup(popupAdd))
    .catch(handleError)
    .finally(() => { renderLoading(false, event.submitter) })
}

function openPopupAvatar() {
  formAvatar.reset();
  revalidateForm(formAvatar, mestoSelectors);
  openPopup(popupAvatar);
}

function openPopupEdit() {
  inputUserName.value = userName.textContent;
  inputUserAbout.value = userAbout.textContent;
  revalidateForm(formEdit, mestoSelectors);
  openPopup(popupEdit);
}

function openPopupAdd() {
  formAdd.reset();
  revalidateForm(formAdd, mestoSelectors);
  openPopup(popupAdd);
}

enableValidation(mestoSelectors);


Promise.all([getServerUserData(), getServerInitialCards()])
  .then(function ([userData, cards]) {
    userId = userData._id;
    userName.textContent = userData.name;
    userAbout.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    console.log(userData)

    for (let i = 0; i < cards.length; i++) {
      cardsContainer.append(createCard(cards[i]))
    }
    console.log(cards)
  })
  .catch(handleError)










































