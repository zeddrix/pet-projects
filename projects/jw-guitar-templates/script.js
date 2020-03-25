const songs = [{
    number: 78,
    title: "\"Teaching the Word of God\"",
    verse: "Acts 18:11",
}];

let songNumber = document.getElementById("songNumber");
songNumber.innerText = songs[0].number;

let songTitle = document.getElementById("songTitle");
songTitle.innerText = songs[0].title

let bibleVerse = document.getElementById("bibleVerse");
bibleVerse.innerText = songs[0].verse
