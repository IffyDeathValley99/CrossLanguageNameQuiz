let namesList = ["George Washington", "Mahatma Ghandi", "God"];
let namesListJapanese = ["ジョージ・ワシントン", "マハトマ・ガンジー", "神様"];
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


let cheese;

fetch('./data.json')
.then(function(u){ return u.json();})
.then(function(json){cheese = json;})

console.log(cheese)