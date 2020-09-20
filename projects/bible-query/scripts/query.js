let currentQuestion = 0;
let count = 0;
let Timer;
let pIndex = 0;
let score = 0;

// --------Attempt to show all levels. UNDONE--------
// const arrayLength = levelsLabels.length;
// const levelsNumberContainer = document.querySelector(".levels__number-container");

// for (let l = 0; l < arrayLength; l++) {
//   const levelsButton = document.createElement("div");
//   levelsButton.innerText = levelsLabels[l].levelNumber;
//   levelsButton.classList.add(".level-number");
//   levelsButton.classList.add(levels[l].name);
//   levelsButton.addEventListener("click", () => changeColor(levelsLabels[l].colorValue));
//   levelsNumberContainer.append(levelsButton);
// }
// --------Attempt to show all levels. UNDONE--------

const startQuery = () => {
  query();
  randomizeQuestions();
  renderRandomQuestions();
  removeHighlightOnSelectedChoice();
  renderProgress();
  renderCounter();
  // Timer = setInterval(renderCounter, 1000);  NO TIMER!
};

let RQ; // RQ = randomizedQuestions
const randomizeQuestions = () => {
  RQ = men1;
  for (i = RQ.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    k = RQ[i];
    RQ[i] = RQ[j];
    RQ[j] = k;
  }
};

let q;
const renderRandomQuestions = () => {
  const questionDiv = document.querySelector("#query__question");
  const clueSourceDiv = document.querySelector("#clue__source");
  const clueSourceContentDiv = document.querySelector("#clue__source-content");
  
  q = RQ[currentQuestion];
  questionDiv.innerHTML = q.question;
  clueSourceDiv.innerHTML = q.clueSource;
  clueSourceContentDiv.innerHTML = q.clueSourceContent;
  
  renderRandomChoices();
};

let RC;
const randomizeChoices = () => {
  RC = q.choices; // RC = randomizedChoices
  let i, j, k;
  for (i = RC.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    k = RC[i];
    RC[i] = RC[j];
    RC[j] = k;
  }
};

const renderRandomChoices = () => {
  randomizeChoices();
  const A = document.querySelector("#choice-A");
  const B = document.querySelector("#choice-B");
  const C = document.querySelector("#choice-C");
  const D = document.querySelector("#choice-D");
  A.innerHTML = RC[0];
  B.innerHTML = RC[1];
  C.innerHTML = RC[2];
  D.innerHTML = RC[3];
};

const lastQuestion = men1.length - 1;
const renderProgress = () => {
  const queryProgress = document.querySelector("#query__progress");
  for (pIndex; pIndex <= lastQuestion; pIndex++) {
    queryProgress.innerHTML += `<div class="query__all-progress" id="${pIndex}"></div>`;
  }
};

const renderCounter = () => {
  const timeGauge = document.querySelector("#query__time");
  const queryCounter = document.querySelector("#query__counter");
  const questionTime = 10;
  let gaugeWidth = 98;
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
      renderRandomQuestions();
    } else {
      clearInterval(Timer);
      finalScore();
    }
  }
};

let selectedChoiceTextContent;
const checkButton = document.querySelector("#query__check-answer-btn");

const highlightSelectedChoice = (event) => {
  const selectedChoice = event.target;

  removeHighlightOnSelectedChoice();

  selectedChoice.classList.add("selected-choice");
  console.log("SELECTED CHOICE:", selectedChoice);
  selectedChoiceTextContent = selectedChoice.textContent;

  checkButton.removeAttribute("disabled");
};

const checkAnswer = () => {
  console.log("CORRECT ANSWER:", men1[currentQuestion].answer);
  console.log("USER'S CHOICE:", selectedChoiceTextContent);
  if (selectedChoiceTextContent == RQ[currentQuestion].answer) {
    score++;
    answerIsCorrect();
  } else {
    answerIsWrong();
  }
  count = 0;
  if (currentQuestion < lastQuestion) {
    currentQuestion++;
    removeHighlightOnSelectedChoice();
    renderRandomQuestions();
    // setTimeout(renderRandomQuestions, 3000);
    // highlightCorrectAnswer();
  } else {
    clearInterval(Timer);
    finalScore();
  }
};

const removeHighlightOnSelectedChoice = () => {
  const allChoices = document.querySelectorAll(".query__choice");
  for (let i = 0; i < allChoices.length; i++) {
    const choice = allChoices[i];
    choice.classList.remove("selected-choice");
  }
  selectedChoiceTextContent = undefined;
  checkButton.setAttribute("disabled", "");

  // FOREACH ALTERNATIVE
  // allChoices.forEach(choice => {
  //   choice.classList.remove("selected-choice");
  // });
};

const answerIsCorrect = () => {
  document.getElementById(currentQuestion).style.backgroundColor = "green";
};

const answerIsWrong = () => {
  document.getElementById(currentQuestion).style.backgroundColor = "red";
};

// const highlightCorrectAnswer = () => {
//   document.querySelectorAll(".query__choice").forEach((p) => {
//     p.addEventListener("click", () => {
//       p.classList.add("active");

//       setTimeout(() => {
//         p.classList.remove("active");
//       }, 400 * 3);
//       400 * 3 = animation-duration * animation-iteration-count
//     });
//   });
// };
// highlightCorrectAnswer();

const restartQuery = () => {
  currentQuestion = 0;
  startQuery();
  closeModal();
  q = RQ[0];
  count = 0;
  pIndex = 0;
  score = 0;
  const allProgress = document.querySelectorAll(".query__all-progress");
  for (let p = 0; p < allProgress.length; p++) {
    allProgress[p].style.backgroundColor = "#FFFFFF00";
  }
};

const scorePhrase1 = () => {
  const scorePercent = Math.round((100 * score) / men1.length);

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

  const finalScorePhrase1Div = document.querySelector("#final-score__phrase-1");
  finalScorePhrase1Div.innerHTML = fsp1;
};

const scoreStarAndPercentage = () => {
  const scorePercent = Math.round((100 * score) / men1.length);

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

  const finalScoreImg = document.querySelector("#final-score__img");
  const imgSrc = document.createAttribute("src");
  imgSrc.value = img;
  finalScoreImg.setAttributeNode(imgSrc);

  const finalScorePercentage = document.querySelector(
    "#final-score__percentage"
  );
  finalScorePercentage.innerHTML = `${scorePercent}%`;
};

const scorePhrase2 = () => {
  const scorePercent = Math.round((100 * score) / men1.length);

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

  const scorePhrase2 = document.querySelector("#final-score__phrase-2");
  scorePhrase2.innerHTML = fsp2;
};
const finalScore = () => {
  closeModal();
  scorePage();
  scoreStarAndPercentage();
  scorePhrase1();
  scorePhrase2();
};

// for (let c = 0; c < arrayLength; c++) {
// const button = document.createElement("button");
// button.innerText =
// parent.prepend(button);
//     button.classList.add(colors[c].name, "button-prop");
//     button.addEventListener('click', () => changeColor(colors[c].colorValue));
//     parent.prepend(button);
// }
