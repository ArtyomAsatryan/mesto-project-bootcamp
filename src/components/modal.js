export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
  }
  
  export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
  }
  
  export function closePopupEsc(event) {
    if (event.key === 'Escape') {
      const popup = document.querySelector('.popup_opened');
      closePopup(popup);
    }
  }




