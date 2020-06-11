const homepageBlock = document.getElementById("homepage-block");
const levelsBlock = document.getElementById("levels-block");
const finalScoreBlock = document.getElementById("final-score-block");
const settingsBlock = document.getElementById("settings-block");
const rulesBlock = document.getElementById("rules-block");
const aboutBlock = document.getElementById("about-block");
const queryBlock = document.getElementById("query-block");
const queryMenuBtns = document.getElementById("query-menu-btns");
const finalScoreMenuBtns = document.getElementById("final-score-menu-btns");

const homepage = () => {
  homepageBlock.style.display = "block";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreBlock.style.display = "none";
  finalScoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
  closeQuitQueryModal();
};

const settings = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreBlock.style.display = "none";
  finalScoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "block";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
};

const rules = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreBlock.style.display = "none";
  finalScoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "block";
  aboutBlock.style.display = "none";
};

const about = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreBlock.style.display = "none";
  finalScoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "block";
};

// PLAY button
const levels = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "block";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreBlock.style.display = "none";
  finalScoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
  closeLevelsModal();
};

const queryPage = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "block";
  queryMenuBtns.style.display = "block";
  finalScoreBlock.style.display = "none";
  finalScoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
  renderQuestion();
  renderProgress();
  renderCounter();
  Timer = setInterval(renderCounter, 1000); // 1000ms = 1s
};

const finalScorePage = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreBlock.style.display = "block";
  finalScoreMenuBtns.style.display = "block";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
}

// On Settings
const resetGameModal = document.getElementById("reset-game-modal");
const showResetGameModal = () => {
  resetGameModal.style.display = "block";
};
const closeResetGameModal = () => {
  resetGameModal.style.display = "none";
};

// TELL YOUR FRIENDS
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

// QUIT
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

// for (let c = 0; c < arrayLength; c++) {
// const button = document.createElement("button");
// button.innerText =
// parent.prepend(button);
//     button.classList.add(colors[c].name, "button-prop");
//     button.addEventListener('click', () => changeColor(colors[c].colorValue));
//     parent.prepend(button);
// }
