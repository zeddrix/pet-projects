let currentQuestion = 0;
let count = 0;
let Timer;
let qIndex = 0;
let score = 0;

const playQueryAgain = () => {
  closeRetryQueryModal();
  currentQuestion = 0;
  q = queens1[0];
  count = 0;
  qIndex = 0;
  score = 0;
  const allProgressCircles = document.getElementsByClassName('progress');
  for (let p = 0; p < allProgressCircles.length; p++) {
    allProgressCircles[p].style.backgroundColor = "#FFFFFF00";
  }
};

const startQuery = () => {
  query();
  renderQuestion();
  renderProgress();
  renderCounter();
  Timer = setInterval(renderCounter, 1000);
};

const renderQuestion = () => {
  const question = document.getElementById("question");
  const clueSource = document.getElementById("clue-source");
  const clueSourceContent = document.getElementById("clue-source-content");
  const choiceA = document.getElementById("A");
  const choiceB = document.getElementById("B");
  const choiceC = document.getElementById("C");
  const choiceD = document.getElementById("D");
  let q = queens1[currentQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  clueSource.innerHTML = "<h2>" + q.clueSource + "</h2>";
  clueSourceContent.innerHTML = "<p>" + q.clueSourceContent + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.innerHTML = q.choiceD;
};

const lastQuestion = queens1.length - 1;
const renderProgress = () => {
  const progress = document.getElementById("progress");
  for (qIndex; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='progress' id=" + qIndex + "></div>";
  }
};

const answerIsCorrect = () => {
  document.getElementById(currentQuestion).style.backgroundColor = "green";
};

const answerIsWrong = () => {
  document.getElementById(currentQuestion).style.backgroundColor = "red";
};

const renderCounter = () => {
  const timeGauge = document.getElementById("time-gauge");
  const counter = document.getElementById("counter");
  const questionTime = 10; // 10s
  let gaugeWidth = 99; // percent
  const gaugeUnit = gaugeWidth / questionTime;

  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "%";
    count++;
  } else {
    count = 0;
    answerIsWrong();
    if (currentQuestion < lastQuestion) {
      currentQuestion++;
      renderQuestion();
    } else {
      clearInterval(Timer);
      finalScore();
    }
  }
};

const checkAnswer = (answer) => {
  if (answer == queens1[currentQuestion].correctAnswer) {
    score++;
    answerIsCorrect();
  } else {
    answerIsWrong();
  }
  count = 0;
  if (currentQuestion < lastQuestion) {
    currentQuestion++;
    renderQuestion();
  } else {
    clearInterval(Timer);
    finalScore();
  }
};

const scoreStarAndPercentage = () => {
  const scorePercent = Math.round((100 * score) / queens1.length);

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

  const finalScoreImgDiv = document.getElementById("final-score-img-div");
  finalScoreImgDiv.innerHTML = "<img id='final-score-img' src=" + img + ">";

  const finalScorePercentageDiv = document.getElementById(
    "final-score-percentage-div"
  );
  finalScorePercentageDiv.innerHTML =
    "<p id='final-score-percentage'>" + scorePercent + "%</p>";
}
const scorePhrase1 = () => {
  const scorePercent = Math.round((100 * score) / queens1.length);

  let sp1 =
    scorePercent == 100
      ? "Well done!"
      : scorePercent >= 90
        ? "Excellent!"
        : scorePercent >= 51
          ? "Nice!"
          : scorePercent >= 50
            ? "Good!"
            : scorePercent >= 30
              ? "Okay!"
              : scorePercent >= 15
                ? "Don't give up!"
                : "Don't give up!";

  const scorePhrase1Div = document.getElementById("score-phrase-1-div");
  scorePhrase1Div.innerHTML = "<h1 id='score-phrase-1'>" + sp1 + "</h1>";
}
const scorePhrase2 = () => {
  const scorePercent = Math.round((100 * score) / queens1.length);

  let sp2 =
    scorePercent == 100
      ? "You got all the questions right!"
      : scorePercent >= 90
        ? "You almost perfected this level!"
        : scorePercent >= 51
          ? "Keep it up!"
          : scorePercent == 50
            ? "You got half the questions right!"
            : scorePercent >= 30
              ? "That's okay. Play again and crush this level!"
              : "Play again and crush this level!";

  const scorePhrase2Div = document.getElementById("score-phrase-2-div");
  scorePhrase2Div.innerHTML = "<p id='score-phrase-2'>" + sp2 + "</p>";
};
const finalScore = () => {
  scorePage();
  scoreStarAndPercentage();
  scorePhrase1();
  scorePhrase2();
};

// // STARTING CODE FOR SHOWING ALL LEVELS
// const showAllLevels = ['-------------------', 'men1', 'women1', 'men2', 'kings1', 'men3', 'queens1', 'rivers', '-------------------'];
// showAllLevels.forEach(function (levelCategories, levelNumber) {
//   const levelString = "level ";
//   const showEachLevel = levelString + levelNumber + " - " + levelCategories;
//   console.log(showEachLevel);
// });

// for (let c = 0; c < arrayLength; c++) {
// const button = document.createElement("button");
// button.innerText =
// parent.prepend(button);
//     button.classList.add(colors[c].name, "button-prop");
//     button.addEventListener('click', () => changeColor(colors[c].colorValue));
//     parent.prepend(button);
// }
