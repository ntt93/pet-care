"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

// 3. Chức năng: Quản lý Breed
// a. Lấy dữ liệu Breed từ LocalStorage
let breedArr = getFromStorage("breedArr") || [];
renderBreedTable(breedArr); //hiển thị dữ liệu lên trang

// Hàm hiển thị dữ liệu
function renderBreedTable(x) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < x.length; i++) {
    const row = document.createElement("tr"); //create a <tr>
    row.innerHTML = `
    <td>${[i + 1]}</td>
    <td>${x[i].breed}</td>
    <td>${x[i].type}</td>
    <td>
    <button type="button" class="btn btn-danger" onclick="deleteBr('${
      x[i].breed
    }')">
    Delete
    </button>
    </td> `;
    tableBodyEl.appendChild(row);
  }
}

// b. Thêm Breed
// Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function (e) {
  // Lấy dữ liệu từ các Form Input
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  //Validate dữ liệu
  const validate = function validate(data) {
    // Không để trống trường breed
    if (data.breed.trim() === "") {
      alert("Please input Breed!");
      return false;
    }
    // Bắt buộc phải chọn giá trị cho trường Type
    if (data.type === "Select Type" || data.type === "") {
      alert("Please select Type!");
      return false;
    }
    return true;
  };

  if (validate(data)) {
    breedArr.push(data); //Thêm object vào mảng
    saveToStorage("breedArr", breedArr); // Cập nhật mảng vào localStorage
    renderBreedTable(breedArr); //Gọi lại hàm renderBreedTable để hiển thị dữ liệu

    // Xóa các dữ liệu nhập trong Form Input
    const clearInput = () => {
      breedInput.value = "";
      typeInput.value = "Select type";
    };
    clearInput();
  }
});

//c. Xóa một hàng breed
// const deleteBr = document.querySelectorAll(".btn-danger");
function deleteBr(breed) {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        breedArr.splice(i, 1); //delete from array
      }
      saveToStorage("breedArr", breedArr);
      renderBreedTable(getFromStorage("breedArr"));
    }
  }
}
