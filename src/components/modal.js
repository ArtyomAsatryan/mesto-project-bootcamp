const popups = document.querySelectorAll('.popup')

export const openPopup = (element) => {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);
}

export const closePopup = (element) => {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);
}

const handleEscape = (evt) => {
    if (evt.key == 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__btn-escape')) {
            closePopup(popup)
        }
    })
})




