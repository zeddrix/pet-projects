document.addEventListener("click", (event) => {
  if (event.target.matches(".levels")) {
    levels();
  } else if (event.target.matches(".settings")) {
    settings();
  } else if (event.target.matches(".modal_close")) {
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
  } else if (event.target.matches(".start-query")) {
    startQuery();
  } else if (event.target.matches("#reset-game__btn")) {
    showResetGameModal();
  } else if (event.target.matches("#query__clue-btn")) {
    showClueModal();
  } else if (event.target.classList.contains("query__choice")) {
    highlightSelectedChoice(event);
  } else if (event.target.matches("#query__check-answer-btn")) {
    checkAnswer(event);
  } else if (event.target.matches("#query__menu-btns__levels")) {
    showLevelsModal();
  } else if (event.target.matches("#query__menu-btns__retry")) {
    showRetryQueryModal();
  } else if (event.target.matches("#query__menu-btns__quit")) {
    showQuitQueryModal();
  } else {
    closeModal();
    console.log(
      "You haven't clicked on any button. You're just clicking everywhere."
    );
  }
});

//TEMPORARY EVENTLISTENER
document.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    checkAnswer();
  }
  //PROBLEM
  //checks answer even if the check btn is disabled
});
