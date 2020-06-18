const songToFind = "1";

const result = songs.filter((song) => song.number.toString(10) === songToFind);

/*
result = [
{
    number: 79,
    title: "Teach Them to Stand Firm",
    verse: "Matthew 28:19, 20",
}];
*/

let songNumber = document.getElementById("song-number");
songNumber.innerText = result[0].number;

let songTitle = document.getElementById("song-title");
songTitle.innerText = result[0].title;

let bibleVerse = document.getElementById("bible-verse");
bibleVerse.innerText = result[0].verse;
