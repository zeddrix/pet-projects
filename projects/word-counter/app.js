window.addEventListener("click", (event) => {
  if (event.target.matches("#count-btn")) {
    displayText();
  }
});

const displayText = () => {
  const wordCounterPage = document.getElementById("word-counter__page");
  const wordsCountedPage = document.getElementById("words-counted__page");
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
    const wordCountDiv = document.getElementById("word-count");
    wordCountDiv.innerHTML = "<h1 class='words-counted__header'> Words Counted: " + wordCount + "</h1>";
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
    const wordDensityDiv = document.getElementById("word-density");

    let table = "<table class='word-density__table'>";
    for (let word in wordDensity) {
      table +=
        "<tr><td>" + word + "</td><td>" + wordDensity[word] + "</td></tr>";
    }
    table += "</table>";

    wordDensityDiv.innerHTML = "<h1 class='words-counted__header'> Word Density: </h1>" + table;
  };

  renderWordCount();
  renderWordDensity();
};
