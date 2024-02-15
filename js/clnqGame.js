var languageFile = sessionStorage.getItem("sessionLanguageFiles");
var unitFolder = sessionStorage.getItem("sessionUnitFolder");

// Fetches the correct json file for the translated names
var dataTranslated;
if (languageFile != "none") {
    fetch(languageFile, {
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
    }).catch(function(err) {
        console.log("FETCH ERROR: " + err);
        window.location.reload();
    });
} else {
    fetch("./data/smile.json", {
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
    }).catch(function(err) {
        console.log("FETCH ERROR: " + err);
        window.location.reload();
    });
}

// Fetches the correct json file for the english names and definitions
var data;
fetch(unitFolder + "data.json", {
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
     window.location.reload();
});

// Declares various variables
let peopleIndex; // Index of the person that NEEDS to be the same in both the dataLanguage.json and the data.json
let singularDescription; // The singular description of the current person
let englishNames; // English names of all the current people
let translatedName; // Translated names of all the current people
let studyMode = false;  // Tracks if studyMode is on which is the user created list for studying
let studyList = [[],[],[]]; // The list for items to be studied later
sessionStorage.setItem("studyList", studyList); // Saves the study list to session storage

// Correct and incorrect counters for questions
let correctCounter = 0;
let incorrectCounter = 0;

// Determines a random whole number between a floor and a ceiling
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min + 0.5);
}

// Determines a new name and updates required elements when called
function newName () {
    // Checks for study mode to handle it
    if (studyMode == false) {
        // Generates a new random people index until a new one is created
        var save = peopleIndex;
        peopleIndex = random(0, data.length - 1);
        if(peopleIndex === save) {
            peopleIndex = save;
            return newName();
        }
        
        // Finds the correct names and description for the new person
        englishNames = data[peopleIndex].names;
        singularDescription = data[peopleIndex].description;
    
        translatedName = dataTranslated[peopleIndex].translatedname;
    
        // Updates the html to reflect the changes
        document.getElementById("nameOutput").textContent = translatedName;
        document.getElementById("descriptionOutput").textContent = singularDescription;

    } else if (studyMode == true) {

        var save = peopleIndex;
        peopleIndex = random(0, studyList[0].length - 1);
        if(peopleIndex === save) {
            peopleIndex = save;
            return newName();
        }

        englishNames = studyList[1][peopleIndex];
        singularDescription = studyList[2][peopleIndex];
    
        translatedName = dataTranslated[studyList[0][peopleIndex]].translatedname;

        document.getElementById("nameOutput").textContent = translatedName + " (Study Mode)";
        document.getElementById("descriptionOutput").textContent = singularDescription;
    }

}

// Checks the current guess on a new input every time the user changes their input
function checkGuess () {
    var guess = ((document.getElementById("guessInput").value).toLowerCase()).replace(/\s+/g, '');
    for(var i = 0; i < englishNames.length; i++) {
        if(guess == (englishNames[i].toLowerCase()).replace(/\s+/g, '')) {
            correctGuess();
        }
    }
}

// Red when incorrect; green when correct
function guessAnimation() {
    document.getElementById("guessInput").readOnly = true; 
    window.setTimeout(function() {
        document.getElementById("guessInput").value = "";
        document.getElementById("guessInput").style.backgroundColor="";
        document.getElementById("guessInput").readOnly = false; 
    }, 800);
}

// Does the right stuff on a correct guess
function correctGuess() {
    correctCounter++;
    document.getElementById("correctGuessCounter").textContent=correctCounter;

    document.getElementById("guessInput").style.backgroundColor="green";
    guessAnimation();
    window.setTimeout(function() {
        newName();
    }, 800);
}

// Is called when the user gives up
function abandonAllHope() {
    incorrectCounter++;
    document.getElementById("incorrectGuessCounter").textContent=incorrectCounter;

    if (englishNames.length > 2) {
        document.getElementById("guessInput").value = englishNames[0]+", "+englishNames[1]+"...";
    } else {
        document.getElementById("guessInput").value = englishNames;
    }
    
    document.getElementById("guessInput").style.backgroundColor="red";
    guessAnimation();
    window.setTimeout(function() {
        newName();
    }, 800);
}

// Adds the current person to the studyList
function studyLater () {
    if (studyMode == false) {
        if(studyList.indexOf(peopleIndex) > -1) {
            return;
        }
    
        studyList[0].push(peopleIndex);
        studyList[1].push(englishNames);
        studyList[2].push(singularDescription);
    } else if (studyMode == true) {
        // Quit study mode
        
        studyMode = false;
        newName();
    }

}

// Will do more stuff soon
function studyNow () {
    if (studyMode == false && studyList[0].length != 0) {
        studyMode = true; 
        peopleIndex = null;
        document.getElementById("studyLaterButton").style.display="none"; 
        document.getElementById("studyNowButton").textContent="Quit Study Mode";
        newName();
    } else if(studyMode == true) {
        studyMode = false; 
        peopleIndex = null;
        document.getElementById("studyLaterButton").style.display="inline-block";
        document.getElementById("studyNowButton").textContent="Study Later"; 
        newName();
    } else if (studyList[0].length == 0) {
        document.getElementById("guessInput").value = "Add something to the study list...";
        document.getElementById("guessInput").style.backgroundColor="red";
        guessAnimation();
    }





}
