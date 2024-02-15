function newChoice () {
    sessionStorage.setItem("sessionUnitFolder", "./data/" + document.getElementById("unitDropdown").value + "/");
    sessionStorage.setItem("sessionLanguageFile", "./data/" + document.getElementById("unitDropdown").value + "/data" + document.getElementById("languageDropdown").value + ".json");
}
newChoice();