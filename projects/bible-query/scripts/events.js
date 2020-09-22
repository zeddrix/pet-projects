document.addEventListener("click", (e) => {
  if (e.target.matches(".levels")) {
    levels();
  } else if (e.target.matches(".settings")) {
    settings();
  } else if (e.target.matches(".modal_close")) {
    closeModal();
  } else if (e.target.matches(".go-to-homepage")) {
    homepage();
  } else if (e.target.matches(".rules")) {
    rules();
  } else if (e.target.matches("#main-btn__about")) {
    about();
  } else if (e.target.matches("#main-btn__friends")) {
    showFriendsModal();
  } else if (e.target.matches("#main-btn__quit")) {
    showQuitModal();
  } else if (e.target.matches(".start-query")) {
    startQuery();
  } else if (e.target.matches("#reset-game__btn")) {
    showResetGameModal();
  } else if (e.target.matches("#query__clue-btn")) {
    showClueModal();
  } else if (e.target.classList.contains("query__choice")) {
    highlightSelectedChoice(e);
  } else if (e.target.matches("#query__check-answer-btn")) {
    checkAnswer(e);
  } else if (e.target.matches("#query__menu-btns__levels")) {
    showLevelsModal();
  } else if (e.target.matches("#query__menu-btns__retry")) {
    showRetryQueryModal();
  } else if (e.target.matches("#query__menu-btns__quit")) {
    showQuitQueryModal();
  } else {
    closeModal();
    console.log(
      "You haven't clicked on any button. You're just clicking everywhere."
    );
  }
});

//TEMPORARY EVENTLISTENER
document.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    checkAnswer();
  }
  //PROBLEM
  //checks answer even if the check btn is disabled
});
