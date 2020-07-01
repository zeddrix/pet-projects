let currentQuestion = 0;
let count = 0;
let Timer;
let qIndex = 0;
let score = 0;
let arrayOfNums = [];

while (arrayOfNums.length < 20) {
  let r = Math.floor(Math.random() * 20);
  if (arrayOfNums.indexOf(r) === -1) arrayOfNums.push(r);
}
console.log(arrayOfNums);

const randomizeQuestions = arrayOfNums.forEach((item) => rivers[item].question);

const confirmRetryQuery = () => {
  closeModal();
  currentQuestion = 0;
  q = rivers[0];
  count = 0;
  qIndex = 0;
  score = 0;
  const allProgress = document.getElementsByClassName("query__all-progress");
  for (let p = 0; p < allProgress.length; p++) {
    allProgress[p].style.backgroundColor = "#FFFFFF00";
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
  const question = document.getElementById("query__question");
  const clueSource = document.getElementById("clue__source");
  const clueSourceContent = document.getElementById("clue__source-content");
  const A = document.getElementById("choice-A");
  const B = document.getElementById("choice-B");
  const C = document.getElementById("choice-C");
  const D = document.getElementById("choice-D");
  let q = rivers[currentQuestion];

  question.innerHTML = q.question;
  clueSource.innerHTML = q.clueSource;
  clueSourceContent.innerHTML = q.clueSourceContent;
  A.innerHTML = q.choiceA;
  B.innerHTML = q.choiceB;
  C.innerHTML = q.choiceC;
  D.innerHTML = q.choiceD;
};

const lastQuestion = rivers.length - 1;
const renderProgress = () => {
  const queryProgress = document.getElementById("query__progress");
  for (qIndex; qIndex <= lastQuestion; qIndex++) {
    queryProgress.innerHTML += `<div class='query__all-progress' id="${qIndex}"></div>`;
  }
};

const answerIsCorrect = () => {
  document.getElementById(currentQuestion).style.backgroundColor = "green";
};

const answerIsWrong = () => {
  document.getElementById(currentQuestion).style.backgroundColor = "red";
};

document.querySelectorAll(".query__choice").forEach((p) => {
  p.addEventListener("click", () => {
    p.classList.add("active");

    setTimeout(() => {
      p.classList.remove("active");
    }, 400 * 3);
    // 400 * 3 = animation-duration * animation-iteration-count
  });
});

const renderCounter = () => {
  const timeGauge = document.getElementById("query__time");
  const queryCounter = document.getElementById("query__counter");
  const questionTime = 10; // 10s
  let gaugeWidth = 98; // percent
  const gaugeUnit = gaugeWidth / questionTime;

  if (count <= questionTime) {
    queryCounter.innerHTML = count;
    timeGauge.style.width = `${count * gaugeUnit}%`;
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
  if (answer == rivers[currentQuestion].correctAnswer) {
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

const scorePhrase1 = () => {
  const scorePercent = Math.round((100 * score) / rivers.length);

  let fsp1 =
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

  const finalScorePhrase1Div = document.getElementById("final-score__phrase-1");
  finalScorePhrase1Div.innerHTML = fsp1;
};

const scoreStarAndPercentage = () => {
  const scorePercent = Math.round((100 * score) / rivers.length);

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

  const finalScoreImg = document.getElementById("final-score__img");
  const imgSrc = document.createAttribute("src");
  imgSrc.value = img;
  finalScoreImg.setAttributeNode(imgSrc);

  const finalScorePercentage = document.getElementById(
    "final-score__percentage"
  );
  finalScorePercentage.innerHTML = `${scorePercent}%`;
};

const scorePhrase2 = () => {
  const scorePercent = Math.round((100 * score) / rivers.length);

  let fsp2 =
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

  const scorePhrase2 = document.getElementById("final-score__phrase-2");
  scorePhrase2.innerHTML = fsp2;
};
const finalScore = () => {
  closeModal();
  scorePage();
  scoreStarAndPercentage();
  scorePhrase1();
  scorePhrase2();
};

// // STARTING CODE FOR SHOWING ALL LEVELS
// const showAllLevels = ['-------------------', 'men1', 'women1', 'men2', 'kings1', 'men3', 'rivers', 'rivers', '-------------------'];
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
