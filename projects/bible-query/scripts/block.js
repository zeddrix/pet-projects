const homepageBlock = document.querySelector("#homepage__block");
const levelsBlock = document.querySelector("#levels__block");
const finalScoreBlock = document.querySelector("#final-score");
const settingsBlock = document.querySelector("#settings__block");
const rulesBlock = document.querySelector("#rules__block");
const aboutBlock = document.querySelector("#about__block");
const queryBlock = document.querySelector("#query");

const homepage = () => {
  homepageBlock.style.display = "block";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  finalScoreBlock.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
  closeModal();
};

const settings = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  finalScoreBlock.style.display = "none";
  settingsBlock.style.display = "block";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
};

const rules = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  finalScoreBlock.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "block";
  aboutBlock.style.display = "none";
};

const about = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  finalScoreBlock.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "block";
};

const levels = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "block";
  queryBlock.style.display = "none";
  finalScoreBlock.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
  closeModal();
};

const query = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "block";
  finalScoreBlock.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
};

const scorePage = () => {
  homepageBlock.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  finalScoreBlock.style.display = "block";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
};
