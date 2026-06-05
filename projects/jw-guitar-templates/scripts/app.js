const inputSectionField = document.getElementById("input-section__field");

const showTemplate = () => {
  const template = document.getElementById("template");
  const home = document.getElementById("home");
  home.style.display = "none";
  template.style.display = "block";
};

const getUserInput = () => {
  const userInput = inputSectionField.value;
  const result = songs.filter((song) => song.number.toString(10) === userInput);

  const songNumber = document.getElementById("template-contents__song-number");
  const songTitle = document.getElementById("template-contents__song-title");
  const bibleVerse = document.getElementById("template__contents__bible-verse");

  songNumber.innerText = result[0].number;
  songTitle.innerText = result[0].title;
  bibleVerse.innerText = result[0].verse;
  showTemplate();
};

const goHome = () => {
  const template = document.getElementById("template");
  const home = document.getElementById("home");
  home.style.display = "block";
  template.style.display = "none";
};

window.addEventListener("click", (event) => {
  if (event.target.matches("#input-section__find-btn")) {
    getUserInput();
  } else if (event.target.matches("#template-contents__back-btn")) {
    goHome();
  } else {
    console.log(
      "You haven't clicked on any button. You're just clicking everywhere."
    );
  }
});

window.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    getUserInput();
  } else if (event.keyCode === 8) {
    goHome();
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
