let namesList;
let currentPeople = [
    ["Mohatma Ghandi", "God"], 
    ["マハトマ・ガンジー", "神様"], 
    ["Description for Ghandi Soon?", "One of the gods of all time"]
];

let peopleIndex;
let singularDescription;
let englishName;
let translatedName;
let language;
let studyList;

let correctCounter = 0;
let incorrectCounter = 0;

function random(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function setLanguages () {
    language = "Japanese";
    // Set currentPeople
}
function newName () {
    peopleIndex = random(0, currentPeople.length - 1);
    englishName = currentPeople[0][peopleIndex];
    translatedName = currentPeople[1][peopleIndex];
    singularDescription = currentPeople[2][peopleIndex];

    document.getElementById("nameOutput").textContent=translatedName;
    document.getElementById("descriptionOutput").textContent=singularDescription;
}
function checkGuess () {
    var guess = ((document.getElementById("guessInput").value).toLowerCase()).replace(/\s+/g, '');
    if (guess == (englishName.toLowerCase()).replace(/\s+/g, '')) {
        newName();
        correctCounter++;
        document.getElementById("guessInput").value = "";
    }
}
function studyLater () {
    studyList.push(translatedName);
}

// var jsonData;
// fetch("./data.json", {
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     }
// }).then(function(res) {
//     if(!res.ok) {
//         console.error("Failed to fetch data.json"):
//     }
//     return res.json();
// }).then(function(res) {
//     jsonData = res;
// }).catch(function(err) {
//     console.log("FETCH ERROR: " + err);
// });
setLanguages(), newName();
