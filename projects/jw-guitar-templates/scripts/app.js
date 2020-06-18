const userInputField = document.getElementById('user-input-field');

userInputField.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        getUserInput();
    }
});

const showTemplatePage = () => {
    const templatePage = document.getElementById('template-page');
    const homePage = document.getElementById('home-page');
    homePage.style.display = "none";
    templatePage.style.display = "block";
}

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
}

const backToHomePage = () => {
    const templatePage = document.getElementById('template-page');
    const homePage = document.getElementById('home-page');
    homePage.style.display = "block";
    templatePage.style.display = "none";
}

// FOR REFERENCE:
// result = [
//     {
//         number: 1,
//         title: "Jehovah’s Attributes",
//         verse: "Revelation 4:11",
//     },
// ];

