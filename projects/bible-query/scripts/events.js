window.addEventListener("click", function (event) {
  if (event.target.matches("#play")) {
    levels();
  } else if (event.target.matches(".settings")) {
    settings();
  } else if (event.target.matches(".close-modal")) {
    closeModal();
  } else if (event.target.matches(".go-to-homepage")) {
    homepage();
  } else if (event.target.matches(".rules")) {
    rules();
  } else if (event.target.matches("#main-btn__about")) {
    about();
  } else if (event.target.matches("#main-btn__friends")) {
    showFriendsModal();
  } else if (event.target.matches("#main-btn__quit")) {
    showQuitModal();
  } else if (event.target.matches("#level-number")) {
    startQuery();
  } else if (event.target.matches("#reset-game__btn")) {
    showResetGameModal();
  } else if (event.target.matches("#clue-btn")) {
    showClueModal();
  } else if (event.target.matches("#query-menu-btns__levels")) {
    showLevelsModal();
  } else if (event.target.matches("#query-menu-btns__retry")) {
    showRetryQueryModal();
  } else if (event.target.matches("#query-menu-btns__quit")) {
    showQuitQueryModal();
  } else if (event.target.matches("#confirm-retry-query")) {
    confirmRetryQuery();
  } else {
    closeModal();
    console.log(
      "You haven't clicked on any button. You're just clicking everywhere."
    );
  }
});
