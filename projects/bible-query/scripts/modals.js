const resetGameModal = document.querySelector("#reset-game-modal");
const friendsModal = document.querySelector("#friends-modal");
const quitModal = document.querySelector("#quit-modal");
const levelsModal = document.querySelector("#levels-modal");
const clueModal = document.querySelector("#clue-modal");
const retryQueryModal = document.querySelector("#retry-query-modal");
const quitQueryModal = document.querySelector("#quit-query-modal");
const backdrop = document.querySelector("#backdrop");

const showResetGameModal = () => {
  resetGameModal.style.display = "block";
  backdrop.style.display = "block";
};
const showFriendsModal = () => {
  friendsModal.style.display = "block";
  backdrop.style.display = "block";
};
const showQuitModal = () => {
  quitModal.style.display = "block";
  backdrop.style.display = "block";
};
const showLevelsModal = () => {
  levelsModal.style.display = "block";
  backdrop.style.display = "block";
};
// QUERY MODALS
const showClueModal = () => {
  clueModal.style.display = "block";
  backdrop.style.display = "block";
};
const showRetryQueryModal = () => {
  retryQueryModal.style.display = "block";
  backdrop.style.display = "block";
};
const showQuitQueryModal = () => {
  quitQueryModal.style.display = "block";
  backdrop.style.display = "block";
};

const closeModal = () => {
  backdrop.style.display = "none";
  resetGameModal.style.display = "none";
  friendsModal.style.display = "none";
  quitModal.style.display = "none";
  levelsModal.style.display = "none";
  clueModal.style.display = "none";
  retryQueryModal.style.display = "none";
  quitQueryModal.style.display = "none";
};
