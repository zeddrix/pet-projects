const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

const lastQuestion = questionsAboutMen.length - 1;
let currentQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 350; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let Timer;
let score = 0;

const renderQuestion = () => {
  let q = questionsAboutMen[currentQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.innerHTML = q.choiceD;
};

const startQuiz = () => {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  Timer = setInterval(renderCounter, 1000); // 1000ms = 1s
};

start.addEventListener("click", startQuiz);

const renderProgress = () => {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='progress' id=" + qIndex + "></div>";
  }
};

const renderCounter = () => {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  } else {
    count = 0;
    // change progress color to red
    answerIsWrong();
    if (currentQuestion < lastQuestion) {
      currentQuestion++;
      renderQuestion();
    } else {
      // end the quiz and show the score
      clearInterval(Timer);
      scoreRender();
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
    // end the quiz and show the score
    clearInterval(Timer);
    scoreRender();
  }
};

const answerIsCorrect = () => {
  document.getElementById(currentQuestion).style.backgroundColor = "green";
};

const answerIsWrong = () => {
  document.getElementById(currentQuestion).style.backgroundColor = "red";
};

const scoreRender = () => {
  scoreDiv.style.display = "block";

  // calculate the amount of question percent answered by the user
  const scorePercent = Math.round((100 * score) / questionsAboutMen.length);

  // choose the image based on the scorePerCent
  let img =
    scorePercent >= 80
      ? "../img/5.png"
      : scorePercent >= 60
      ? "../img/4.png"
      : scorePercent >= 40
      ? "../img/3.png"
      : scorePercent >= 20
      ? "../img/2.png"
      : "../img/1.png";

  scoreDiv.innerHTML = "<img src=" + img + ">";
  scoreDiv.innerHTML += "<p>" + scorePercent + "%</p>";
};

// for (let c = 0; c < arrayLength; c++) {
// const button = document.createElement("button");
// button.innerText =
// parent.prepend(button);
//     button.classList.add(colors[c].name, "button-prop");
//     button.addEventListener('click', () => changeColor(colors[c].colorValue));
//     parent.prepend(button);
// }
