function newChoice () {
    choice = document.getElementById("languageDropdown").value;
    sessionStorage.setItem("sessionLanguage", "./data/data" + choice + ".json");
}
newChoice();