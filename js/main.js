let namesList = ["George Washington", "Mahatma Ghandi", "God"];
let singularName;
function random(min, max) {
    return Math.random() * (max - min) + min;
}
function determineName () {
    singularName = random(0, namesList.length - 1);
    document.getElementById("nameOutput").textContent=singularName;
}