"use strict";
//Gọi DOM elements
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");

//Lấy dữ liệu petArr từ LocalStorage
const petArr = getFromStorage("petArr") ? getFromStorage("petArr") : [];
const breedArr = getFromStorage("breedArr") ? getFromStorage("breedArr") : [];

//Gọi hàm hiển thị dữ liệu lên trang
renderTableData(petArr);

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
    <td>5${petArr[i].length}</td>
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
    }/${new Date(petArr[i].date).getFullYear()}</td>`;
    tableBodyEl.appendChild(row);
  }
}

//Hàm sự kiện tìm kiếm dữ liệu
findBtn.addEventListener("click", function () {
  let petArrFind = petArr;

  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value)); //dùng includes thì chỉ cần nhập 1 phần ID khi tìm kiếm
  }

  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }

  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }

  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }

  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }

  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }

  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }
  renderTableData(petArrFind);
});

//Hiển thị tất cả breed
function renderBreed(arr) {
  arr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
renderBreed(breedArr);
