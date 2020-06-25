const homepageBlock = document.getElementById("homepage__block");
const levelsBlock = document.getElementById("levels__block");
const scoreBlock = document.getElementById("score__block");
const settingsBlock = document.getElementById("settings__block");
const rulesBlock = document.getElementById("rules__block");
const aboutBlock = document.getElementById("about__block");
const queryBlock = document.getElementById("query__block");
const queryMenuBtns = document.getElementById("query-menu-btns");
const scoreMenuBtns = document.getElementById("score-menu-btns");

const homepage = () => {
  homepageBlock.style.display = "block";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  scoreBlock.style.display = "none";
  scoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
  closeModal();
};

const settings = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  scoreBlock.style.display = "none";
  scoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "block";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
};

const rules = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  scoreBlock.style.display = "none";
  scoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "block";
  aboutBlock.style.display = "none";
};

const about = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  scoreBlock.style.display = "none";
  scoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "block";
};

const levels = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "block";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  scoreBlock.style.display = "none";
  scoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
  closeModal();
};

const query = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "block";
  queryMenuBtns.style.display = "block";
  scoreBlock.style.display = "none";
  scoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
};

const scorePage = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  scoreBlock.style.display = "block";
  scoreMenuBtns.style.display = "block";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
};
