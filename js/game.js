var language = sessionStorage.getItem("sessionLanguage");
var dataTranslated;
fetch(language, {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}).then(function(res) {
    if(!res.ok) {
        console.error("Failed to fetch language.json");
    }
    return res.json();
}).then(function(res) {
    // Initiate data and start game
    dataTranslated = res;
}).catch(function(errerr) {
    console.log("FETCH ERROR: " + err);
});


var data;
fetch("./data/data.json", {
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
     newName();
}).catch(function(err) {
     console.log("FETCH ERROR: " + err);
});

let peopleIndex;
let singularDescription;
let englishNames;
let translatedName;
let studyList = [];

let correctCounter = 0;
let incorrectCounter = 0;

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min + 0.5);
}
function newName () {
    var save = peopleIndex;
    peopleIndex = random(0, data.length - 1);
    if(peopleIndex === save) {
        peopleIndex = save;
        return newName();
    }

    englishNames = data[peopleIndex].names;
    singularDescription = data[peopleIndex].description;

    translatedName = dataTranslated[peopleIndex].translatedname;

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
    window.setTimeout(function() {
        newName();
        document.getElementById("guessInput").value = "";
        document.getElementById("guessInput").style.backgroundColor="";
        document.getElementById("guessInput").readOnly = false; 
    }, 400);
}
function correctGuess() {
    correctCounter++;
    document.getElementById("correctGuessCounter").textContent=correctCounter;

    document.getElementById("guessInput").style.backgroundColor="green";
    guessAnimation();
}
function abandonAllHope() {
    incorrectCounter++;
    document.getElementById("incorrectGuessCounter").textContent=incorrectCounter;

    document.getElementById("guessInput").value = englishNames;
    document.getElementById("guessInput").style.backgroundColor="red";
    guessAnimation();
}
function studyLater () {
    if(studyList.indexOf(peopleIndex) > -1) {
        return;
    }
    studyList.push(peopleIndex);
}