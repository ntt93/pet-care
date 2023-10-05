"use strict";
const btnImport = document.getElementById("import-btn");
const btnExport = document.getElementById("export-btn");
const inputFile = document.getElementById("input-file");
console.log(getFromStorage("petArr"));

//Export
btnExport.addEventListener("click", function saveStaticDataToFile() {
  let blob = new Blob([JSON.stringify(getFromStorage("petArr"))], {
    type: "application/json",
  });
  saveAs(blob, "filename.json");
});

//Import
btnImport.addEventListener("click", function () {
  //check đã chọn tệp chưa
  if (!inputFile.value) {
    alert("Vui lòng chọn tệp");
  }
  const file = inputFile.files[0];
  const reader = new FileReader();
  //load file
  reader.addEventListener(
    "load",
    function () {
      saveToStorage("petArr", JSON.parse(reader.result));
      alert("Import successful!");
    },
    false
  );

  if (file) {
    reader.readAsText(file);
  }
  inputFile.value = ""; //reset inputFile
});
