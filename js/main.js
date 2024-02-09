let namesList;
let currentPeople = [
    ["Mahatma Ghandi", "God"], 
    ["マハトマ・ガンジー", "神様"], 
    ["Description for Ghandi Soon?", "One of the gods of all time"]
];

var data;
fetch("../data.json", {
     headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
     }
}).then(function(res) {
     if(!res.ok) {
         console.error("Failed to fetch data.json");
     }
     return res.json();
}).then(function(res) {
     // Initiate data and start game
     data = res;
     setLanguages(), newName();
}).catch(function(err) {
     console.log("FETCH ERROR: " + err);
});

let peopleIndex;
let singularDescription;
let englishNames;
let translatedName;
let language;
let studyList;

let correctCounter = 0;
let incorrectCounter = 0;

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min + 0.5);
}
function setLanguages () {
    language = "Japanese";
    // Set currentPeople
}
function newName () {
    peopleIndex = random(0, data.length - 1);
    englishNames = data[peopleIndex].names;
    translatedName = data[peopleIndex].japanesename;
    singularDescription = data[peopleIndex].description;

    document.getElementById("nameOutput").textContent = translatedName;
    document.getElementById("descriptionOutput").textContent = singularDescription;
}
function checkGuess () {
    var guess = ((document.getElementById("guessInput").value).toLowerCase()).replace(/\s+/g, '');
    for(var i = 0; i < englishNames.length; i++) {
        if(guess == (englishNames[i].toLowerCase()).replace(/\s+/g, '')) {
            newName();
            correctCounter++;
            document.getElementById("guessInput").value = "";
        }
    }
}
function studyLater () {
    studyList.push(translatedName);
}
