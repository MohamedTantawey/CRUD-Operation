// Element References
var form = document.getElementById("myForm"),
  imgInput = document.querySelector(".imgholder img"),
  file = document.getElementById("imgInput"),
  userName = document.getElementById("name"),
  age = document.getElementById("age"),
  city = document.getElementById("city"),
  email = document.getElementById("email"),
  phone = document.getElementById("phone"),
  post = document.getElementById("post"),
  sDate = document.getElementById("sDate"),
  submitBTN = document.querySelector(".submit"),
  userInfo = document.getElementById("data"),
  modal = document.getElementById("userForm"),
  modalTitle = document.querySelector("#userForm .modal-title"),
  newUserBtn = document.querySelector(".newUser");

// Data Initialization
let getData = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile"))
  : [];

let isEdit = false,
  editId = null;

// Show Initial Data
showInfo();

// New User Button Click
newUserBtn.addEventListener("click", () => {
  submitBTN.innerHTML = "Submit";
  modalTitle.innerHTML = "Fill The Form";
  isEdit = false;
  imgInput.src = "assets/person-fill.svg";
  form.reset();
});

// File Input Change Handler
file.onchange = function () {
  if (file.files[0].size < 1000000) {
    var fileReader = new FileReader();
    fileReader.onload = function (e) {
      imgInput.src = e.target.result;
    };
    fileReader.readAsDataURL(file.files[0]);
  } else {
    alert("File size exceeds 1MB");
  }
};

// Display All Entries
function showInfo() {
  userInfo.innerHTML = "";
  getData.forEach((element, index) => {
    let createElement = `<tr class="employeeDetails">
      <td>${index + 1}</td>
      <td><img src="${element.picture}" alt="" width="50" height="50" /></td> 
      <td>${element.employeeName}</td>
      <td>${element.employeeAge}</td>
      <td>${element.employeeCity}</td>
      <td>${element.employeeEmail}</td>
      <td>${element.employeePhone}</td>
      <td>${element.employeePost}</td>
      <td>${element.startDate}</td>
      <td>
        <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData">
          <i class="bi bi-eye"></i>
        </button>
        <button class="btn btn-primary" onclick="editInfo(${element.id})" data-bs-toggle="modal" data-bs-target="#userForm">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button class="btn btn-danger" onclick="deleteInfo(${element.id})">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    </tr>`;
    userInfo.innerHTML += createElement;
  });
}

// Add or Update Entry
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const information = {
    id: isEdit ? editId : Date.now(),
    picture: imgInput.src || "assets/person-fill.svg",
    employeeName: userName.value,
    employeeAge: age.value,
    employeeCity: city.value,
    employeeEmail: email.value,
    employeePhone: phone.value,
    employeePost: post.value,
    startDate: sDate.value,
  };

  if (!isEdit) {
    getData.push(information);
  } else {
    const index = getData.findIndex(item => item.id === editId);
    getData[index] = information;
    isEdit = false;
    editId = null;
  }

  localStorage.setItem("userProfile", JSON.stringify(getData));

  submitBTN.innerHTML = "Submit";
  modalTitle.innerHTML = "Fill The Form";

  showInfo();
  form.reset();
  imgInput.src = "assets/person-fill.svg";
  modal.style.display = "none";
  document.querySelector(".modal-backdrop")?.remove();
});

// Read (View) Info in Read Modal
function readInfo(pic, name, age, city, email, phone, post, sDate) {
  document.querySelector(".showImg").src = pic;
  document.getElementById("showName").value = name;
  document.getElementById("showAge").value = age;
  document.getElementById("showCity").value = city;
  document.getElementById("showEmail").value = email;
  document.getElementById("showPhone").value = phone;
  document.getElementById("showPost").value = post;
  document.getElementById("showsDate").value = sDate;
}

// Edit Entry
function editInfo(id) {
  const record = getData.find(item => item.id === id);
  if (!record) return;

  isEdit = true;
  editId = id;

  imgInput.src = record.picture;
  userName.value = record.employeeName;
  age.value = record.employeeAge;
  city.value = record.employeeCity;
  email.value = record.employeeEmail;
  phone.value = record.employeePhone;
  post.value = record.employeePost;
  sDate.value = record.startDate;

  submitBTN.innerHTML = "Update";
  modalTitle.innerHTML = "Update The Form";
}

// Delete Entry
function deleteInfo(id) {
  if (confirm("Are you sure you want to delete?")) {
    getData = getData.filter(item => item.id !== id);
    localStorage.setItem("userProfile", JSON.stringify(getData));
    showInfo();
  }
}
