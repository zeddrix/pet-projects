const resetGameModal = document.getElementById("reset-game-modal");
const showResetGameModal = () => {
  resetGameModal.style.display = "block";
};
const closeResetGameModal = () => {
  resetGameModal.style.display = "none";
};

const tellYourFriendsModal = document.getElementById("tell-your-friends-modal");
const showTellYourFriendsModal = () => {
  tellYourFriendsModal.style.display = "block";
};
const closeTellYourFriendsModal = () => {
  tellYourFriendsModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == tellYourFriendsModal) {
    tellYourFriendsModal.style.display = "none";
  }
};

const quitModal = document.getElementById("quit-modal");
const showQuitModal = () => {
  quitModal.style.display = "block";
};
const closeQuitModal = () => {
  quitModal.style.display = "none";
};

const levelsModal = document.getElementById("levels-modal");
const showLevelsModal = () => {
  levelsModal.style.display = "block";
};
const closeLevelsModal = () => {
  levelsModal.style.display = "none";
};

// QUERY MODALS
const clueModal = document.getElementById("clue-modal");
const showClueModal = () => {
  clueModal.style.display = "block";
};
const closeClueModal = () => {
  clueModal.style.display = "none";
};

const retryQueryModal = document.getElementById("retry-query-modal");
const showRetryQueryModal = () => {
  retryQueryModal.style.display = "block";
};
const closeRetryQueryModal = () => {
  retryQueryModal.style.display = "none";
};

const quitQueryModal = document.getElementById("quit-query-modal");
const showQuitQueryModal = () => {
  quitQueryModal.style.display = "block";
};
const closeQuitQueryModal = () => {
  quitQueryModal.style.display = "none";
};
