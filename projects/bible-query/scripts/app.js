// HOME BUTTONS
const homepage = document.getElementById("homepage");
const levelsBlock = document.getElementById("levels-block");
const finalScoreBlock = document.getElementById("final-score-block");
const settingsBlock = document.getElementById("settings-block");
const rulesBlock = document.getElementById("rules-block");
const aboutBlock = document.getElementById("about-block");
// QUERY
const queryBlock = document.getElementById("query-block");
const queryMenuBtns = document.getElementById("query-menu-btns");
let currentQuestion = 0;
let count = 0;
let Timer;
let score = 0;
const finalScoreMenuBtns = document.getElementById("final-score-menu-btns");

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
  closeQuitQueryModal();
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
// RESET GAME
const resetGameModal = document.getElementById("reset-game-modal");
const showResetGameModal = () => {
  resetGameModal.style.display = "block";
};
const closeResetGameModal = () => {
  resetGameModal.style.display = "none";
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
  closeLevelsModal();
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

const renderQuestion = () => {
  const question = document.getElementById("question");
  const clueSource = document.getElementById("clue-source");
  const clueSourceContent = document.getElementById("clue-source-content");
  const choiceA = document.getElementById("A");
  const choiceB = document.getElementById("B");
  const choiceC = document.getElementById("C");
  const choiceD = document.getElementById("D");
  let q = mainMenCharacters1[currentQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  clueSource.innerHTML = "<h2>" + q.clueSource + "</h2>";
  clueSourceContent.innerHTML = "<p>" + q.clueSourceContent + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.innerHTML = q.choiceD;
};

const lastQuestion = mainMenCharacters1.length - 1;
const renderProgress = () => {
  const progress = document.getElementById("progress");
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='progress' id=" + qIndex + "></div>";
  }
};

const renderCounter = () => {
  const timeGauge = document.getElementById("time-gauge");
  const counter = document.getElementById("counter");
  const questionTime = 10; // 10s
  let gaugeWidth = 99; // em
  const gaugeUnit = gaugeWidth / questionTime;

  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "%";
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
  if (answer == mainMenCharacters1[currentQuestion].correctAnswer) {
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

// QUERY MODALS
const clueModal = document.getElementById("clue-modal");
const showClueModal = () => {
  clueModal.style.display = "block";
};
const closeClueModal = () => {
  clueModal.style.display = "none";
};

const levelsModal = document.getElementById("levels-modal");
const showLevelsModal = () => {
  levelsModal.style.display = "block";
};
const closeLevelsModal = () => {
  levelsModal.style.display = "none";
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

  const scorePercent = Math.round((100 * score) / mainMenCharacters1.length);
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
      ? "Don't give up!"
      : "Don't give up!";
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
      ? "That's okay. Play again and crush this level!"
      : "Play again and crush this level!";

  const scorePhrase1Div = document.getElementById("score-phrase-1-div");
  scorePhrase1Div.innerHTML = "<h1 id='score-phrase-1'>" + sp1d + "</h1>";
  const finalScoreImgDiv = document.getElementById("final-score-img-div");
  finalScoreImgDiv.innerHTML = "<img id='final-score-img' src=" + img + ">";
  const finalScorePercentageDiv = document.getElementById(
    "final-score-percentage-div"
  );
  finalScorePercentageDiv.innerHTML =
    "<p id='final-score-percentage'>" + scorePercent + "%</p>";
  const scorePhrase2Div = document.getElementById("score-phrase-2-div");
  scorePhrase2Div.innerHTML = "<p id='score-phrase-2'>" + sp2d + "</p>";
};

// for (let c = 0; c < arrayLength; c++) {
// const button = document.createElement("button");
// button.innerText =
// parent.prepend(button);
//     button.classList.add(colors[c].name, "button-prop");
//     button.addEventListener('click', () => changeColor(colors[c].colorValue));
//     parent.prepend(button);
// }
