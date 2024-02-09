let currentNames;
let singularName;
let language;
function random(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}   
function setLanguages () {
    language = "Japanese";
    currentNames = 0;

    document.getElementById("")
}
function determineName () {
    singularName = currentNames[random(0, currentNames.length - 1)];
    document.getElementById("nameOutput").textContent=singularName;
}
function studyLater () {

}
setLanguages(), determineName();

const fs = require('fs');
const jsonData = readFileSync('data.json', 'utf8');
console.log(jsonData)