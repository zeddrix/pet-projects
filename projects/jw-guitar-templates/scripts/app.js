const userInputField = document.getElementById("user-input-field");

const showTemplatePage = () => {
  const templatePage = document.getElementById("template-page");
  const homePage = document.getElementById("home-page");
  homePage.style.display = "none";
  templatePage.style.display = "block";
};

const getUserInput = () => {
  const userInput = userInputField.value;
  const result = songs.filter((song) => song.number.toString(10) === userInput);

  const songNumber = document.getElementById("song-number");
  const songTitle = document.getElementById("song-title");
  const bibleVerse = document.getElementById("bible-verse");

  songNumber.innerText = result[0].number;
  songTitle.innerText = result[0].title;
  bibleVerse.innerText = result[0].verse;
  showTemplatePage();
};

const backToHomePage = () => {
  const templatePage = document.getElementById("template-page");
  const homePage = document.getElementById("home-page");
  homePage.style.display = "block";
  templatePage.style.display = "none";
};

window.addEventListener("click", function (event) {
  if (event.target.matches("#find-template-btn")) {
    getUserInput();
  } else if (event.target.matches("#back-to-home-btn")) {
    backToHomePage();
  } else {
    console.log(
      "You haven't clicked on any button. You're just clicking everywhere."
    );
  }
});

userInputField.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    getUserInput();
  }
});

// FOR REFERENCE:
// result = [
//     {
//         number: 1,
//         title: "Jehovah’s Attributes",
//         verse: "Revelation 4:11",
//     },
// ];
