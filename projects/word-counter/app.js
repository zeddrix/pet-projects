const displayText = () => {
  const inputPage = document.getElementById("input-page");
  const countPage = document.getElementById("count-page");
  const inputtedText = document.getElementById("inputted-text");
  const inputtedTextValue = inputtedText.value;

  if (inputtedText.value !== "") { // normal flow will continue if the text-area is not empty
    inputPage.style.display = "none";
    document.getElementById("display-user-text").innerText = inputtedTextValue;
    countPage.style.display = "block";
  } else { // if the text-area is empty, it will issue a warning.
    alert("This area required")
  }

  console.log(countWords(inputtedTextValue));
};

const countWords = (str) => {
  return str.split(" ").length;
};

const renderWordCount = () => {
  document.getElementById("word-count") = wordCount;
};