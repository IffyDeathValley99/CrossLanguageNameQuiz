function newChoice () {
    sessionStorage.setItem("sessionLanguage", "./data/data" + document.getElementById("languageDropdown").value + ".json");
}
newChoice();