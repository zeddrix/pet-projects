window.addEventListener('click', function (event) {
  if (event.target.matches('.go-to-levels')) {
    levels()
  } else if (event.target.matches('.settings-btn')) {
    settings()
  } else if (event.target.matches('.close-modal')) {
    closeModal()
  } else if (event.target.matches('.go-to-homepage')) {
    homepage()
  } else if (event.target.matches('.rules-btn')) {
    rules()
  } else if (event.target.matches('.about-btn')) {
    about()
  } else if (event.target.matches('.friends-btn')) {
    showFriendsModal()
  } else if (event.target.matches('.quit-btn')) {
    showQuitModal()
  } else if (event.target.matches('#level-number')) {
    startQuery()
  } else if (event.target.matches('#reset-game-btn')) {
    showResetGameModal()
  } else if (event.target.matches('#show-clue-modal-btn')) {
    showClueModal()
  } else if (event.target.matches('#show-levels-modal-btn')) {
    showLevelsModal()
  } else if (event.target.matches('#show-retry-modal-btn')) {
    showRetryQueryModal()
  } else if (event.target.matches('#show-quit-modal-btn')) {
    showQuitQueryModal()
  } else if (event.target.matches('#confirm-retry-query')) {
    confirmRetryQuery()
  } else {
    closeModal();
    console.log("You haven't clicked on any button. You're just clicking everywhere.");
  }
})




