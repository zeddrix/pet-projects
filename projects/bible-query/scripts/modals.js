const resetGameModal = document.getElementById("reset-game-modal");
const friendsModal = document.getElementById("friends-modal");
const quitModal = document.getElementById("quit-modal");
const levelsModal = document.getElementById("levels-modal");
const clueModal = document.getElementById("clue-modal");
const retryQueryModal = document.getElementById("retry-query-modal");
const quitQueryModal = document.getElementById("quit-query-modal");

const showResetGameModal = () => {
  resetGameModal.style.display = "block";
};
const showfriendsModal = () => {
  friendsModal.style.display = "block";
};
window.onclick = function (event) {
  if (event.target == friendsModal) {
    friendsModal.style.display = "none";
  }
};
const showQuitModal = () => {
  quitModal.style.display = "block";
};
const showLevelsModal = () => {
  levelsModal.style.display = "block";
};
// QUERY MODALS
const showClueModal = () => {
  clueModal.style.display = "block";
};
const showRetryQueryModal = () => {
  retryQueryModal.style.display = "block";
};
const showQuitQueryModal = () => {
  quitQueryModal.style.display = "block";
};

const closeModal = () => {
  resetGameModal.style.display = "none";
  friendsModal.style.display = "none";
  quitModal.style.display = "none";
  levelsModal.style.display = "none";
  clueModal.style.display = "none";
  retryQueryModal.style.display = "none";
  quitQueryModal.style.display = "none";
}