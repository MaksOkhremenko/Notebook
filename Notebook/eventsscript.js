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
        event: cells[0].textContent,
        description: cells[1].textContent,
        date: cells[2].getElementsByTagName("input")[0].value,
      };
      data.push(rowData);
    }
  }

  localStorage.setItem("eventTableData", JSON.stringify(data));
}

function loadTableData() {
  // Завантаження даних з локального сховища
  var tableBody = document.getElementById("tableBody");
  var savedData = localStorage.getItem("eventTableData");

  if (savedData) {
    var data = JSON.parse(savedData);

    for (var i = 0; i < data.length; i++) {
      addRow(data[i].event, data[i].description, data[i].date);
    }
  }
}

function deleteRow(button) {
  // Видалення рядка з таблиці та збереження змін в локальному сховищі
  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
  saveTableData();
}

function addRow(event = "", description = "", date = "") {
  // Додавання нового рядка до таблиці та збереження змін в локальному сховищі
  var tableBody = document.getElementById("tableBody");
  var newRow = tableBody.insertRow(tableBody.rows.length);

  var cols = 4; // Кількість колонок

  var cell = newRow.insertCell(0);
  cell.contentEditable = "true";
  cell.appendChild(document.createTextNode(event));
  cell.addEventListener("input", saveTableData);

  cell = newRow.insertCell(1);
  cell.contentEditable = "true";
  cell.appendChild(document.createTextNode(description));
  cell.addEventListener("input", saveTableData);

  cell = newRow.insertCell(2);
  var dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = date;
  cell.appendChild(dateInput);
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
