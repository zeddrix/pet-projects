const wordCounterPage = document.getElementById("word-counter__page");
const wordsCountedPage = document.getElementById("words-counted__page");
window.addEventListener("click", (event) => {
  if (event.target.matches("#count-btn")) {
    displayText();
  } else if (event.target.matches("#back-btn")) {
    homepage();
  }
});

const displayText = () => {
  const textarea = document.getElementById("textarea");
  const textValue = textarea.value;

  if (textarea.value !== "") {
    // normal flow will continue if the text-area is not empty
    wordCounterPage.style.display = "none";
    document.getElementById("your-text__body").innerText = textValue;
    wordsCountedPage.style.display = "block";
  } else {
    // if the text-area is empty, it will issue a warning.
    alert("Please enter some text first.");
  }

  const countWords = (str) => {
    return str.split(" ").length;
  };
  const wordCount = countWords(textValue);

  const renderWordCount = () => {
    const wordsCounted = document.getElementById("words-counted");
    wordsCounted.innerHTML = "Words Counted: " + wordCount;
  };

  const getWordDensity = (str) => {
    let wordList = {};
    str.split(/\s+/).forEach((word) => {
      if (typeof wordList[word] == "undefined") {
        wordList[word] = 1;
      } else {
        wordList[word]++;
      }
    });
    return wordList;
  };
  const wordDensity = getWordDensity(textValue);

  const renderWordDensity = () => {
    let table = "<table class='word-density__table'>";
    for (let word in wordDensity) {
      table +=
        "<tr><td>" + word + "</td><td>" + wordDensity[word] + "</td></tr>";
    }
    table += "</table>";

    const wordDensityBody = document.getElementById("word-density__body");
    wordDensityBody.innerHTML = table;
  };

  renderWordCount();
  renderWordDensity();
};

const homepage = () => {
  wordCounterPage.style.display = "block";
  wordsCountedPage.style.display = "none";
};
