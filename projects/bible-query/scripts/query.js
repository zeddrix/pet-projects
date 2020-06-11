let currentQuestion = 0;
let count = 0;
let Timer;
let qIndex = 0;
let score = 0;

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

const finalScoreRender = () => {
  finalScorePage();
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

const playQueryAgain = () => {
  currentQuestion = 0;
  q = mainMenCharacters1[0];
  count = 0;
  qIndex = 0;
  score = 0;
  const allProgressCircles = document.getElementsByClassName('progress');
  for(let i = 0; i < allProgressCircles.length; i++) {
    allProgressCircles[i].style.backgroundColor = "#FFFFFF00";
  }
  closeRetryQueryModal();
};
