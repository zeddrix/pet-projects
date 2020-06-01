// HOME BUTTONS
const homepage = document.getElementById("homepage");
const levelsBlock = document.getElementById("levels-block");
const finalScoreBlock = document.getElementById("final-score-block");
const settingsBlock = document.getElementById("settings-block");
const rulesBlock = document.getElementById("rules-block");
const aboutBlock = document.getElementById("about-block");
const tellYourFriendsModal = document.getElementById("tell-your-friends-modal");
const quitModal = document.getElementById("quit-modal");
const resetGameModal = document.getElementById("reset-game-modal");
const clueModal = document.getElementById("clue-modal");
// QUERY
const queryBlock = document.getElementById("query-block");
const question = document.getElementById("question");
const clueSource = document.getElementById("clue-source");
const clueSourceContent = document.getElementById("clue-source-content");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
let currentQuestion = 0;
let count = 0;
let Timer;
let score = 0;
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const finalScore = document.getElementById("final-score");
const scorePhrase1Div = document.getElementById("score-phrase-1-div");
const finalScoreImgDiv = document.getElementById("final-score-img-div");
const finalScorePercentageDiv = document.getElementById(
  "final-score-percentage-div"
);
const scorePhrase2Div = document.getElementById("score-phrase-2-div");
const finalScoreMenuBtns = document.getElementById("final-score-menu-btns");
const queryMenuBtns = document.getElementById("query-menu-btns");

const bibleQueryHomepage = () => {
  homepage.style.display = "block";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreBlock.style.display = "none";
  finalScoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
};

const settingsPage = () => {
  homepage.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreBlock.style.display = "none";
  finalScoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "block";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
};

const rulesPage = () => {
  homepage.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreBlock.style.display = "none";
  finalScoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "block";
  aboutBlock.style.display = "none";
};

const aboutPage = () => {
  homepage.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreBlock.style.display = "none";
  finalScoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "block";
};

// RESET GAME
const showResetGameModal = () => {
  resetGameModal.style.display = "block";
};
const closeResetGameModal = () => {
  resetGameModal.style.display = "none";
};
// TELL YOUR FRIENDS
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
const showQuitModal = () => {
  quitModal.style.display = "block";
};
const closeQuitModal = () => {
  quitModal.style.display = "none";
};
// SHOW CLUE
const showClueModal = () => {
  clueModal.style.display = "block";
};
const closeClueModal = () => {
  clueModal.style.display = "none";
};

// PLAY button
const levelsPage = () => {
  homepage.style.display = "none";
  levelsBlock.style.display = "block";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreBlock.style.display = "none";
  finalScoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
};
// levels
const queryPage = () => {
  homepage.style.display = "none";
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

const finalScoreRender = () => {
  homepage.style.display = "none";
  levelsBlock.style.display = "none";
  queryBlock.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreBlock.style.display = "block";
  finalScoreMenuBtns.style.display = "block";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
  const scorePercent = Math.round((100 * score) / men.length);
  let img =
    scorePercent == 100
      ? "img/three-stars.png"
      : scorePercent >= 90
      ? "img/two-and-a-half-stars.png"
      : scorePercent >= 70
      ? "img/two-stars.png"
      : scorePercent >= 50
      ? "img/one-and-a-half-star.png"
      : scorePercent >= 30
      ? "img/one-star.png"
      : scorePercent >= 15
      ? "img/one-half-star.png"
      : "img/zero-star.png";
  let sp1d =
    scorePercent == 100
      ? "Well done!"
      : scorePercent >= 90
      ? "Excellent!"
      : scorePercent >= 51
      ? "Good!"
      : scorePercent >= 50
      ? "Nice!"
      : scorePercent >= 30
      ? "Okay!"
      : scorePercent >= 15
      ? "How sad!"
      : "How awful!";
  let sp2d =
    scorePercent == 100
      ? "You got all the questions right!"
      : scorePercent >= 90
      ? "You almost perfected this level!"
      : scorePercent >= 51
      ? "Not bad!"
      : scorePercent == 50
      ? "You got half the questions right!"
      : scorePercent >= 30
      ? "Try to nail this level next time!"
      : "Try to nail this level next time!";
  scorePhrase1Div.innerHTML = "<h1 id='score-phrase-1'>" + sp1d + "</h1>";
  finalScoreImgDiv.innerHTML = "<img id='final-score-img' src=" + img + ">";
  finalScorePercentageDiv.innerHTML =
    "<p id='final-score-percentage'>" + scorePercent + "%</p>";
  scorePhrase2Div.innerHTML = "<p id='score-phrase-2'>" + sp2d + "</p>";
};

const lastQuestion = men.length - 1;
const renderQuestion = () => {
  let q = men[currentQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  clueSource.innerHTML = "<h2>" + q.clueSource + "</h2>";
  clueSourceContent.innerHTML = "<p>" + q.clueSourceContent + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.innerHTML = q.choiceD;
};

const renderProgress = () => {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='progress' id=" + qIndex + "></div>";
  }
};

const questionTime = 10; // 10s
let gaugeWidth = 15; // em
const gaugeUnit = gaugeWidth / questionTime;
// const responsiveTimeGauge = (oppo, galaxy, desktop) => {
//   if (oppo.matches) {
//     timeGauge.style.width = "40em";
//   } else if (galaxy.matches) {
//     timeGauge.style.width = "40em";
//   } else if (desktop.matches) {
//     timeGauge.style.width = "24.3em";
//   } else {
//     timeGauge.style.width = "24.3em";
//   }
// };

// const oppo = window.matchMedia("(min-width: 275px)");
// const galaxy = window.matchMedia("(min-width: 360px)");
// const desktop = window.matchMedia("(min-device-width: 1600px)");
// responsiveTimeGauge(oppo, galaxy, desktop);

const renderCounter = () => {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "em";
    count++;
  } else {
    count = 0;
    // change progress color to red
    answerIsWrong();
    if (currentQuestion < lastQuestion) {
      currentQuestion++;
      renderQuestion();
    } else {
      // end the query and show the score
      clearInterval(Timer);
      finalScoreRender();
    }
  }
};

const checkAnswer = (answer) => {
  if (answer == men[currentQuestion].correctAnswer) {
    score++;
    answerIsCorrect();
    // change progress color to green
  } else {
    answerIsWrong();
    // change progress color to red
  }
  count = 0;
  if (currentQuestion < lastQuestion) {
    currentQuestion++;
    renderQuestion();
  } else {
    // end the query and show the score
    clearInterval(Timer);
    finalScoreRender();
  }
};

const answerIsCorrect = () => {
  document.getElementById(currentQuestion).style.backgroundColor = "green";
};

const answerIsWrong = () => {
  document.getElementById(currentQuestion).style.backgroundColor = "red";
};

// for (let c = 0; c < arrayLength; c++) {
// const button = document.createElement("button");
// button.innerText =
// parent.prepend(button);
//     button.classList.add(colors[c].name, "button-prop");
//     button.addEventListener('click', () => changeColor(colors[c].colorValue));
//     parent.prepend(button);
// }
