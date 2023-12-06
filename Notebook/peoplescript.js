document.addEventListener("DOMContentLoaded", function () {
  // Завантаження даних з локального сховища при завантаженні сторінки
  loadTableData();
});

function saveTableData() {
  // Зберігання даних в локальному сховищі
  var tableBody = document.getElementById("tableBody");
  var rows = tableBody.getElementsByTagName("tr");

  var data = [];

  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    if (cells.length === 4) {
      var rowData = {
        name: cells[0].textContent,
        phoneNumber: cells[1].textContent,
        birthday: cells[2].getElementsByTagName("input")[0].value,
      };
      data.push(rowData);
    }
  }

  localStorage.setItem("tableData", JSON.stringify(data));
}

function loadTableData() {
  // Завантаження даних з локального сховища
  var tableBody = document.getElementById("tableBody");
  var savedData = localStorage.getItem("tableData");

  if (savedData) {
    var data = JSON.parse(savedData);

    for (var i = 0; i < data.length; i++) {
      addRow(data[i].name, data[i].phoneNumber, data[i].birthday);
    }
  }
}

function deleteRow(button) {
  // Видалення рядка з таблиці та збереження змін в локальному сховищі
  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
  saveTableData();
}

function addRow(name = "", phoneNumber = "", birthday = "") {
  // Додавання нового рядка до таблиці та збереження змін в локальному сховищі
  var tableBody = document.getElementById("tableBody");
  var newRow = tableBody.insertRow(tableBody.rows.length);

  var cols = 4; // Кількість колонок

  var cell = newRow.insertCell(0);
  cell.contentEditable = "true";
  cell.appendChild(document.createTextNode(name));
  cell.addEventListener("input", saveTableData);

  cell = newRow.insertCell(1);
  cell.contentEditable = "true";
  cell.appendChild(document.createTextNode(phoneNumber));
  cell.addEventListener("input", saveTableData);

  cell = newRow.insertCell(2);
  var birthdayInput = document.createElement("input");
  birthdayInput.type = "date";
  birthdayInput.value = birthday;
  cell.appendChild(birthdayInput);
  cell.addEventListener("input", saveTableData);

  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Видалити";
  deleteButton.classList.add('remove_btn');
  deleteButton.onclick = function () {
    deleteRow(this);
  };

  cell = newRow.insertCell(3);
  cell.appendChild(deleteButton);

  // Зберігання змін в локальному сховищі
  saveTableData();
}
