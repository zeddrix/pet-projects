const displayText = () => {
  const inputPage = document.getElementById("input-page");
  const countPage = document.getElementById("count-page");
  const text = document.getElementById("text");
  const textValue = text.value;

  if (text.value !== "") { // normal flow will continue if the text-area is not empty
    inputPage.style.display = "none";
    document.getElementById("display-text").innerText = textValue;
    countPage.style.display = "block";
  } else { // if the text-area is empty, it will issue a warning.
    alert("Please enter some text first.")
  }

  const countWords = (str) => {
    return str.split(" ").length;
  };
  const wordCount = (countWords(textValue));

  const renderWordCount = () => {
    const wordCountDiv = document.getElementById("word-count");
    wordCountDiv.innerHTML = "<h1> Words Counted: " + wordCount + "</h1>";
  };

  renderWordCount();
};
