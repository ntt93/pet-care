"use strict";
//1. Bổ sung Animation cho Sidebar
const sidebarEl = document
  .getElementById("sidebar")
  .addEventListener("click", function () {
    this.classList.toggle("active");
  });

//lấy ra các DOM Element
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
const calcBmiBtn = document.getElementById("calc-bmi-btn");
const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");

//Lấy dữ liệu petArr từ LocalStorage
let petArr = getFromStorage("petArr") ?? [];
renderTableData(petArr); //hiển thị dữ liệu lên trang

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr"); //create a <tr>
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight}</td>
    <td>${petArr[i].length}</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${new Date(petArr[i].date).getDate()}/${
      new Date(petArr[i].date).getMonth() + 1
    }/${new Date(petArr[i].date).getFullYear()}</td>
    <td>
    <button class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button></td> `;
    tableBodyEl.appendChild(row);
  }
}

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
    date: new Date(),
  };
  // console.log(data);

  //Validate dữ liệu
  const validateData = function (data) {
    // Không có trường nào bị nhập thiếu dữ liệu
    if (data.id.trim() === "") {
      alert("Pet ID is required!");
      return false;
    }

    if (data.name.trim() === "") {
      alert("Pet Name is required!");
      return false;
    }

    if (isNaN(data.age)) {
      alert("Age is required!");
      return false;
    }

    if (isNaN(data.weight)) {
      alert("Weight is required!");
      return false;
    }

    if (isNaN(data.length)) {
      alert("Length is required!");
      return false;
    }

    // Giá trị ID không được trùng với các thú cưng còn lại
    for (let i = 0; i < petArr.length; i++) {
      if (data.id === petArr[i].id) {
        alert("ID must be unique!");
        return false;
        break;
      }
    }
    // Trường Age chỉ được nhập giá trị trong khoảng 1 đến 15
    if (data.age < 1 || data.age > 15) {
      alert("Age must be between 1 and 15!");
      return false;
    }
    // Trường Weight chỉ được nhập giá trị trong khoảng 1 đến 15
    if (data.weight < 1 || data.weight > 15) {
      alert("Weight must be between 1 and 15!");
      return false;
    }
    // Trường Length chỉ được nhập giá trị trong khoảng 1 đến 100
    if (data.length < 1 || data.length > 100) {
      alert("Length must be between 1 and 100!");
      return false;
    }
    // Bắt buộc phải chọn giá trị cho trường Type
    if (data.type === "Select Type") {
      alert("Please select Type!");
      return false;
    }
    // Bắt buộc phải chọn giá trị cho trường Breed
    if (data.breed === "Select Breed") {
      alert("Please select Breed!");
      return false;
    }

    return true;
  };
  // console.log(validate);

  if (validateData(data)) {
    //Thêm thú cưng vào danh sách
    petArr.push(data);
    // console.log(petArr);

    //hiển thị danh sách thú cưng
    saveToStorage("petArr", petArr);
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

//Xóa một thú cưng
const deleteBtn = document.querySelector(".btn-danger");
function deletePet(petId) {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        //delete from array
        petArr.splice(i, 1);
      }
    }
    saveToStorage("petArr", petArr);
    renderTableData(getFromStorage("petArr"));
  }
}

//Hiển thị các thú cưng khỏe mạnh
let healthyCheck = true;
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === true) {
    //hiển thị thú cưng khỏe mạnh
    const healthyPetArr = [];
    //lọc điều kiện
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        //ghi thú cưng khỏe mạnh ra mảng
        healthyPetArr.push(petArr[i]);
      }
    }
    healthyBtn.textContent = "Show All pet"; //đổi tên nút
    renderTableData(healthyPetArr);
    healthyCheck = false; //đổi lại biến
  } else {
    healthyBtn.textContent = "Show Healthy pet"; //đổi tên nút
    renderTableData(petArr);
    healthyCheck = true; //đổi lại biến
  }
});

//4. Hiển thị Breed trong màn hình quản lý thú cưng
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
//Hiệu ứng onChange khi thay đổi type
typeInput.addEventListener("change", function (arr) {
  renderBreed(getFromStorage("breedArr"), arr.target.value);
});
