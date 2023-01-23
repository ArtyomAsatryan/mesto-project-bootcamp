export function renderLoading(loading, button, buttonText = 'Сохранить') {
  if (loading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = buttonText
  }
}
