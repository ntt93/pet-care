"use strict";

// //lấy ra các DOM Element
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
const editElList = document.querySelectorAll(".btn.btn-danger");
const formEl = document.getElementById("container-form");

//lấy dữ liệu từ localStorage
const petArr = getFromStorage("petArr") ? getFromStorage("petArr") : [];
const breedArr = getFromStorage("breedArr") ? getFromStorage("breedArr") : [];

//FORM SUBMIT
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr"); //create a <tr>
    row.innerHTML = `
    <th scope="row">${pet.id}</th>
    <td>${pet.name}</td>
    <td>${pet.age}</td>
    <td>${pet.type}</td>
    <td>${pet.weight}</td>
    <td>${pet.length}</td>
    <td>${pet.breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
    </td>
    <td><i class="bi ${
      pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${new Date(pet.date).getDate()}/${
      new Date(pet.date).getMonth() + 1
    }/${new Date(pet.date).getFullYear()}</td>
    <td>
    <button type="button" style="background-color:#ffc107; color: #000 " class="btn btn-danger" onclick="editPet('${
      pet.id
    }')">Edit</button></td> `;
    tableBodyEl.appendChild(row);
  });
}
renderTableData(petArr);

//Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function (e) {
  //Lấy dữ liệu từ các Form Input
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    // date: new Date(),
  };

  //Validate dữ liệu
  const validateData = function (data) {
    let isValidate = true;
    // Không có trường nào bị nhập thiếu dữ liệu
    if (data.id.trim() === "") {
      alert("Pet ID is required!");
      isValidate = false;
    }

    if (data.name.trim() === "") {
      alert("Pet Name is required!");
      isValidate = false;
    }

    if (isNaN(data.age)) {
      alert("Age is required!");
      isValidate = false;
    }

    if (isNaN(data.weight)) {
      alert("Weight is required!");
      isValidate = false;
    }

    if (isNaN(data.length)) {
      alert("Length is required!");
      isValidate = false;
    }
    // Trường Age, Weight chỉ được nhập giá trị trong khoảng 1 đến 15
    if (data.age < 1 || data.age > 15) {
      alert("Age must be between 1 and 15!");
      isValidate = false;
    }

    if (data.weight < 1 || data.weight > 15) {
      alert("Weight must be between 1 and 15!");
      isValidate = false;
    }
    // Trường Length chỉ được nhập giá trị trong khoảng 1 đến 100
    if (data.length < 1 || data.length > 100) {
      alert("Length must be between 1 and 100!");
      isValidate = false;
    }
    // Bắt buộc phải chọn giá trị cho trường Type, Breed
    if (data.type === "Select Type") {
      alert("Please select Type!");
      isValidate = false;
    }

    if (data.breed === "Select Breed") {
      alert("Please select Breed!");
      isValidate = false;
    }

    return isValidate;
  };

  const validate = validateData(data);
  // console.log(validate);
  if (validate) {
    const i = petArr.findIndex((pet) => pet.id === data.id);
    //giữ nguyên date như cũ
    data.date = petArr[i].date;
    //cập nhật lại dữ liệu thú cưng
    petArr[i] = data;
    saveToStorage("petArr", petArr);
    //ẩn form và hiện lại dữ liệu thú cưng
    formEl.classList.add("hide");
    renderTableData(petArr);

    //Xóa các dữ liệu nhập trong Form Input
    const clearInput = () => {
      idInput.value = "";
      nameInput.value = "";
      ageInput.value = "";
      typeInput.value = "Select type";
      weightInput.value = "";
      lengthInput.value = "";
      colorInput.value = "#000000";
      breedInput.value = "Select breed";
      vaccinatedInput.checked = false;
      dewormedInput.checked = false;
      sterilizedInput.checked = false;
    };
    clearInput();
  }
}); //kết thúc hiệu ứng button Submit

//EDIT THÚ CƯNG
//Hàm nhập lại type và breed sau khi click nút Edit
let renderBreed = function (arr, type) {
  breedInput.innerHTML = "<option>Select Breed</option>"; //ghi vào html
  //Lọc ra mảng chứa type trùng với type được select
  let arrTemp = arr.filter(function (arr) {
    return arr.type === type;
  });
  //Ghi giá trị từng breed đã nhập vào breedInput
  arrTemp.forEach(function (arr) {
    const option = document.createElement("option");
    option.innerHTML = arr.breed;
    breedInput.appendChild(option);
  });
};

//Hàm chỉnh sửa dữ liệu thông tin thú cưng
function editPet(id) {
  //hiện lại form nhập liệu
  formEl.classList.remove("hide");
  //tìm đến dữ liệu thú cưng cần edit
  const pet = petArr.find((petArr) => petArr.id === id);
  // hiển thị những thông tin của thú cưng lên form nhập
  idInput.value = pet.id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  renderBreed(getFromStorage("breedArr"), pet.type);
  breedInput.value = pet.breed;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
}

//Hiệu ứng onChange khi thay đổi type
typeInput.addEventListener("change", function (arr) {
  renderBreed(getFromStorage("breedArr"), arr.target.value);
});
