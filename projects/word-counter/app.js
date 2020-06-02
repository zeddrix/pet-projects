const displayText = () => {
  const inputPage = document.getElementById("input-page");
  const countPage = document.getElementById("count-page");
  inputPage.style.display = "none";
  // get user's inputted text
  const inputtedText = document.getElementById("inputted-text");
  const inputtedTextValue = inputtedText.value;
  // diplay user's inputted text
  document.getElementById("display-user-text").innerText = inputtedTextValue;
  countPage.style.display = "block";
  console.log(countWords(inputtedTextValue));
};

const countWords = (str) => {
  return str.split(" ").length;
}

const renderWordCount = () => {
   document.getElementById("word-count") = wordCount;
}
