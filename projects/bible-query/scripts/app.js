const homepage = document.getElementById("homepage");
const levelsBlock = document.getElementById("levels-block");
const settingsBlock = document.getElementById("settings-block");
const rulesBlock = document.getElementById("rules-block");
const aboutBlock = document.getElementById("about-block");

const query = document.getElementById("query");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");

const finalScoreContainer = document.getElementById("final-score-container");
const finalScore = document.getElementById("final-score");
const finalScoreImgDiv = document.getElementById("final-score-img-div");
const finalScorePercentage = document.getElementById("final-score-percentage");
const finalScoreMenuBtns = document.getElementById("final-score-menu-btns");

const queryMenuBtns = document.getElementById("query-menu-btns");

let currentQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 24.3; // em
const gaugeUnit = gaugeWidth / questionTime;
let Timer;
let score = 0;

const bibleQueryHomepage = () => {
  homepage.style.display = "block";
  levelsBlock.style.display = "none";
  query.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreContainer.style.display = "none";
  finalScoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
};

// PLAY button
const levelsPage = () => {
  homepage.style.display = "none";
  levelsBlock.style.display = "block";
  query.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreContainer.style.display = "none";
  finalScoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
};
// levels
const queryPage = () => {
  homepage.style.display = "none";
  levelsBlock.style.display = "none";
  query.style.display = "block";
  queryMenuBtns.style.display = "block";
  finalScoreContainer.style.display = "none";
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
  query.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreContainer.style.display = "block";
  finalScoreMenuBtns.style.display = "block";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";

  // calculate the amount of question percent answered by the user
  const scorePercent = Math.round((100 * score) / questionsAboutMen.length);

  // choose the image based on the scorePerCent
  let img =
    scorePercent >= 99
      ? "../img/3-star.jpg"
      : scorePercent >= 66
      ? "../img/2-star.jpg"
      : scorePercent >= 33
      ? "../img/1-star.jpg"
      : "../img/0-star.jpg";

  finalScoreImgDiv.innerHTML = "<img id='final-score-img' src=" + img + ">";
  finalScorePercentage.innerHTML += "<p>" + scorePercent + "%</p>";
};

const settingsPage = () => {
  homepage.style.display = "none";
  levelsBlock.style.display = "none";
  query.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreContainer.style.display = "none";
  finalScoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "block";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "none";
};

const rulesPage = () => {
  homepage.style.display = "none";
  levelsBlock.style.display = "none";
  query.style.display = "none";
  queryMenuBtns.style.display = "none";
  finalScoreContainer.style.display = "none";
  finalScoreMenuBtns.style.display = "none";
  settingsBlock.style.display = "none";
  rulesBlock.style.display = "block";
  aboutBlock.style.display = "none";
};

const aboutPage = () => {
  homepage.style.display = "none";
  query.style.display = "none";
  levelsBlock.style.display = "none";

  settingsBlock.style.display = "none";
  rulesBlock.style.display = "none";
  aboutBlock.style.display = "block";
};

const lastQuestion = questionsAboutMen.length - 1;
const renderQuestion = () => {
  let q = questionsAboutMen[currentQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
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
  if (answer == questionsAboutMen[currentQuestion].correctAnswer) {
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
