let currentQuestion = 0;
let count = 0;
let Timer;
let qIndex = 0;
let score = 0;

const confirmRetryQuery = () => {
  renderRandomQuestions();
  closeModal();
  currentQuestion = 0;
  q = men1[0];
  count = 0;
  qIndex = 0;
  score = 0;
  const allProgress = document.getElementsByClassName("query__all-progress");
  for (let p = 0; p < allProgress.length; p++) {
    allProgress[p].style.backgroundColor = "#FFFFFF00";
  }
};

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

const renderRandomQuestions = () => {
  const questionDiv = document.getElementById("query__question");
  const clueSourceDiv = document.getElementById("clue__source");
  const clueSourceContentDiv = document.getElementById("clue__source-content");

  let RQ = men1; // RQ = randomizedQuestions
  for (i = RQ.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    k = RQ[i];
    RQ[i] = RQ[j];
    RQ[j] = k;
  }
  let q = RQ[currentQuestion];
  questionDiv.innerHTML = q.question;
  clueSourceDiv.innerHTML = q.clueSource;
  clueSourceContentDiv.innerHTML = q.clueSourceContent;
  // console.log(RQ);

  let RC = q.choices; // RC = randomizedChoices
  const renderRandomChoices = () => {
    let i, j, k;
    for (i = RC.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * i);
      k = RC[i];
      RC[i] = RC[j];
      RC[j] = k;
    }
    const A = document.getElementById("choice-A");
    const B = document.getElementById("choice-B");
    const C = document.getElementById("choice-C");
    const D = document.getElementById("choice-D");
    A.innerHTML = RC[0];
    B.innerHTML = RC[1];
    C.innerHTML = RC[2];
    D.innerHTML = RC[3];

    // console.log(RC);
  };
  renderRandomChoices();
};

const startQuery = () => {
  query();
  renderRandomQuestions();
  renderProgress();
  renderCounter();
  // Timer = setInterval(renderCounter, 1000);  NO TIMER!
};

const lastQuestion = men1.length - 1;
const renderProgress = () => {
  const queryProgress = document.getElementById("query__progress");
  for (qIndex; qIndex <= lastQuestion; qIndex++) {
    queryProgress.innerHTML += `<div class="query__all-progress" id="${qIndex}"></div>`;
  }
};

const answerIsCorrect = () => {
  document.getElementById(currentQuestion).style.backgroundColor = "green";
};

const answerIsWrong = () => {
  document.getElementById(currentQuestion).style.backgroundColor = "red";
};

const highlightCorrectAnswer = () => {
  document.querySelectorAll(".query__choice").forEach((p) => {
    p.addEventListener("click", () => {
      p.classList.add("active");

      setTimeout(() => {
        p.classList.remove("active");
      }, 400 * 3);
      // 400 * 3 = animation-duration * animation-iteration-count
    });
  });
};
// highlightCorrectAnswer(); NO HIGHLIGHT!

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
      renderRandomQuestions();
    } else {
      clearInterval(Timer);
      finalScore();
    }
  }
};

const checkAnswer = (target) => {
  const choiceTextValue = document.querySelector(".query__choice").textContent;
  console.log('CORRECT ANSWER:', men1[currentQuestion].answer);
  console.log("USER'S CHOICE:", choiceTextValue);
  console.log('checkAnswer', target.innerText);
  if (choiceTextValue == men1[currentQuestion].answer) {
    score++;
    answerIsCorrect();
  } else {
    answerIsWrong();
  }
  count = 0;
  if (currentQuestion < lastQuestion) {
    currentQuestion++;
    renderRandomQuestions();
    // setTimeout(renderRandomQuestions, 3000);
    // highlightCorrectAnswer();
  } else {
    clearInterval(Timer);
    finalScore();
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

  const finalScorePhrase1Div = document.getElementById("final-score__phrase-1");
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
