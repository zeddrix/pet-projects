const songs = [{
    number: 78,
    title: "\"Teaching the Word of God\"",
    verse: "Acts 18:11",
},
{
    number: 79,
    title: "Teach Them to Stand Firm",
    verse: "Matthew 28:19, 20",
},
{
    number: 80,
    title: "\"Taste and See That Jehovah is Good\"",
    verse: "Psalm 34:8",
}];


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

