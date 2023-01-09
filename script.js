"use strict";
// Variables Declaration
const submitBtn = document.querySelector("#submit-btn");
const showPetBtn = document.getElementById("healthy-btn");
const idInput = document.querySelector("#input-id");
const nameInput = document.querySelector("#input-name");
const ageInput = document.querySelector("#input-age");
const typeInput = document.querySelector("#input-type");
const weightInput = document.querySelector("#input-weight");
const lengthInput = document.querySelector("#input-length");
const colorInput = document.querySelector("#input-color-1");
const breedInput = document.querySelector("#input-breed");
const vaccinatedInput = document.querySelector("#input-vaccinated");
const dewormedInput = document.querySelector("#input-dewormed");
const sterilizedInput = document.querySelector("#input-sterilized");
const myForm = document.querySelector("#myForm");
let petArr = [];

// Submit Button
function submitButton(e) {
  e.preventDefault();
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    sterilized: sterilizedInput.checked,
    dewormed: dewormedInput.checked,
    date: new Date(),
  };
  console.log(data);
  // Validate data from input fields
  function validate() {
    if (
      IdInputChecked(data.id, petArr) &&
      ageInputChecked(data) &&
      weightInputChecked(data) &&
      typeInputChecked(data) &&
      lengthInputChecked(data) &&
      breedInputChecked(data) &&
      allInputFilled()
    ) {
      return true;
    } else return false;
  }
  console.log(validate(data));
  // Add Pets to Databases when validation succeeds
  if (validate()) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
  }
  console.log(petArr);
  showPetBtn.innerText = "Show Healthy Pet";
  return petArr;
}

// Add Events to Submit Button
submitBtn.addEventListener("click", submitButton);

// Delete Button Function
document.querySelector("#myTableBody").addEventListener("click", (e) => {
  let userAnswer = confirm("Are you sure you want to delete this pet");
  if (userAnswer && e.target.classList.contains("delete")) {
    let deletedRow = e.target.parentElement.parentElement;
    let deleteIndex = deletedRow.rowIndex - 1;
    petArr.splice(deleteIndex, 1);
    renderTableData(petArr);
    // console.log(deletedRow.rowIndex);
    // console.log(deletedRow.cells[0].innerHTML);
    // console.log(deletedRow.cells.length);
    // deletedRow.remove();
    // alert("deleted");
    return petArr;
  }
});

// Filter Pet Function
let healthyCheck = false;
let healthyPetArr = [];
showPetBtn.addEventListener("click", function (e) {
  e.preventDefault;
  // healthyCheckFunction(petArr);
  if (healthyCheck === false) {
    showPetBtn.style.backgroundColor = "green";
    showPetBtn.style.color = "yellow";
    showPetBtn.innerText = "Show All Pet";
    healthyPetArr = petArr.filter(function (pet) {
      return (
        pet.dewormed === true &&
        pet.sterilized === true &&
        pet.vaccinated === true
      );
    });
    console.log(healthyPetArr);
    renderTableData(healthyPetArr);
    healthyCheck = true;
  } else if (healthyCheck === true) {
    showPetBtn.style.backgroundColor = "aqua";
    showPetBtn.style.color = "red";
    showPetBtn.innerText = "Show Healthy Pet";
    renderTableData(petArr);
    healthyCheck = false;
  }
  return [healthyCheck, petArr, healthyPetArr];
});

// Check Unique Id Function
function IdInputChecked(checkID, arr) {
  // let count = 0;
  let checkResult = true;
  if (arr.length > 0) {
    for (let pet of arr) {
      if (checkID === pet.id) {
        alert("ID must be unique");
        checkResult = false;
        break;
      }
    }
  }
  // console.log(`check unique ID is ${checkResult}`);
  return checkResult;
}

// Check Age Function
function ageInputChecked(obj) {
  if (obj.age < 1 || obj.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  } else return true;
}
// Check Weight Function
function weightInputChecked(obj) {
  if (obj.weight < 1 || obj.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  } else return true;
}

// Check Length Function
function lengthInputChecked(obj) {
  if (obj.length < 1 || obj.length > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  } else return true;
}

// Check Type Function
function typeInputChecked(obj) {
  if (obj.type === "Select Type") {
    alert("Please select Type!");
    return false;
  } else return true;
}
// Check Breed Type Function
function breedInputChecked(obj) {
  if (obj.breed === "Select Breed") {
    alert("Please select Breed!");
    return false;
  } else return true;
}
// Check All Input Filled Func
function allInputFilled() {
  if (
    idInput.value === "" ||
    nameInput.value === "" ||
    ageInput.value === "" ||
    typeInput.value === "Select Type" ||
    weightInput.value === "" ||
    lengthInput.value === "" ||
    breedInput.value === "Select Breed"
  ) {
    alert("Please fill all the fields!");
    return false;
  } else return true;
}

// Render Table Data Function
function renderTableData(array) {
  const myTable = document.querySelector("#myTable");
  const myTableBody = myTable.querySelector("#myTableBody");
  myTableBody.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    var newRow = myTableBody.insertRow();
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = array[i].id;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = array[i].name;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = array[i].age;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = array[i].type;
    var cell4 = newRow.insertCell(4);
    cell4.innerHTML = `${array[i].weight} kg`;
    var cell5 = newRow.insertCell(5);
    cell5.innerHTML = `${array[i].length} cm`;
    var cell6 = newRow.insertCell(6);
    cell6.innerHTML = array[i].breed;
    var cell7 = newRow.insertCell(7);
    cell7.innerHTML = `<i
      class="bi bi-square-fill"
      style="color: ${array[i].color}"></i>`;
    var cell8 = newRow.insertCell(8);
    cell8.innerHTML = array[i].vaccinated;
    if (array[i].vaccinated) {
      cell8.innerHTML = `<i class="bi bi-check-circle-fill"></i>`;
    } else cell8.innerHTML = `<i class="bi bi-x-circle-fill"></i>`;

    var cell9 = newRow.insertCell(9);
    if (array[i].dewormed) {
      cell9.innerHTML = `<i class="bi bi-check-circle-fill"></i>`;
    } else cell9.innerHTML = `<i class="bi bi-x-circle-fill"></i>`;
    var cell10 = newRow.insertCell(10);
    if (array[i].sterilized) {
      cell10.innerHTML = `<i class="bi bi-check-circle-fill"></i>`;
    } else cell10.innerHTML = `<i class="bi bi-x-circle-fill"></i>`;
    var cell11 = newRow.insertCell(11);
    cell11.innerHTML = `${array[i].date.getDate()}/${
      array[i].date.getMonth() + 1
    }/${array[i].date.getFullYear()}`;
    var cell12 = newRow.insertCell(12);
    cell12.innerHTML = `<button
      type="button"
      class="btn btn-danger delete"
      >Delete</button>`;
  }
}
// Clear Input Function
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  sterilizedInput.checked = false;
  dewormedInput.checked = false;
}
