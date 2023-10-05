"use strict";

//2. Lưu dữ liệu dưới LocalStorage
//hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
//hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
} //(khi lấy dữ liệu chỉ cần gọi mỗi key, sẽ trả về value)
