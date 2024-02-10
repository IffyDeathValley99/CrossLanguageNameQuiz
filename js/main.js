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
     setLanguage(), newName();
}).catch(function(err) {
     console.log("FETCH ERROR: " + err);
});

let peopleIndex;
let singularDescription;
let englishNames;
let translatedName;
let language;
let studyList = [];

let correctCounter = 0;
let incorrectCounter = 0;

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min + 0.5);
}
function setLanguage () {
    language = "japanesename";
    // Set currentPeople
}
function newName () {
    var save = peopleIndex;
    peopleIndex = random(0, data.length - 1);
    if(peopleIndex === save) {
        peopleIndex = save;
        return newName();
    }

    englishNames = data[peopleIndex].names;
    translatedName = data[peopleIndex].japanesenam;
    singularDescription = data[peopleIndex].description;

    document.getElementById("nameOutput").textContent = translatedName;
    document.getElementById("descriptionOutput").textContent = singularDescription;
}
function checkGuess () {
    var guess = ((document.getElementById("guessInput").value).toLowerCase()).replace(/\s+/g, '');
    for(var i = 0; i < englishNames.length; i++) {
        if(guess == (englishNames[i].toLowerCase()).replace(/\s+/g, '')) {
            correctGuess();
        }
    }
}
function guessAnimation() {
    document.getElementById("guessInput").readOnly = true; 

    
    setTimeout(function() {
        newName();
        document.getElementById("guessInput").value = "";
        document.getElementById("guessInput").style.backgroundColor="";
        document.getElementById("guessInput").readOnly = false; 
    }, 400);
}
function correctGuess() {
    correctCounter++;
    document.getElementById("guessInput").style.backgroundColor="green";
    guessAnimation();
}
function abandonAllHope() {
    incorrectCounter++;
    document.getElementById("guessInput").value = englishNames;
    document.getElementById("guessInput").style.backgroundColor="red";
    guessAnimation();
}
function studyLater () {
    for(var i = 0; i < studyList.length; i++) {
        if(studyList[i] == peopleIndex) {
            return;
        }
    }
    studyList.push(peopleIndex);
}