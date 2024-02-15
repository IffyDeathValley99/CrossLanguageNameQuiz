function newChoice () {
    // Adds session storages for the session's unit folder and language files
    sessionStorage.setItem("sessionUnitFolder", "./data/" + document.getElementById("unitDropdown").value + "/");
    sessionStorage.setItem("sessionLanguageFiles", "./data/" + document.getElementById("unitDropdown").value + "/data" + document.getElementById("languageDropdown").value + ".json");
}
newChoice();