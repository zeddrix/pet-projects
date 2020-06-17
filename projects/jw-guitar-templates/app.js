const songToFind = "78";

const result = songs.filter(song => song.number.toString(10) === songToFind);

/*
result = [
{
    number: 79,
    title: "Teach Them to Stand Firm",
    verse: "Matthew 28:19, 20",
}];
*/

let songNumber = document.getElementById("songNumber");
songNumber.innerText = result[0].number;

let songTitle = document.getElementById("songTitle");
songTitle.innerText = result[0].title;

let bibleVerse = document.getElementById("bibleVerse");
bibleVerse.innerText = result[0].verse;

