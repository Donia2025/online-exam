const SignUp = document.querySelector(".SignUp");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmedpassword = document.getElementById("confirm-password");
const firstnameError = document.querySelector(".firstnameError");
const lastnameError = document.querySelector(".lastnameError");
const emailError = document.querySelector(".emailError");
const passwordError = document.querySelector(".passwordError");
const passwordConfirmError = document.querySelector(".passwordConfirmError");

const regEmail = /.+@gmail\.com/;
const regextext = /^[A-Za-z\s]+$/;

function save(e) {
  e.preventDefault();
  let valid = true;

  if (firstName.value.trim() !== "") {
    if (!regextext.test(firstName.value.trim())) {
      firstnameError.classList.remove("hidden");
      valid = false;
    } else {
      firstnameError.classList.add("hidden");
    }
  } else {
    firstnameError.classList.remove("hidden");
    valid = false;
  }
  if (lastName.value.trim() !== "") {
    if (!regextext.test(lastName.value.trim())) {
      valid = false;
      lastnameError.classList.remove("hidden");
    } else {
      lastnameError.classList.add("hidden");
    }
  } else {
    lastnameError.classList.remove("hidden");
    valid = false;
  }
  if (email.value.trim() !== "") {
    if (!regEmail.test(email.value.trim())) {
      emailError.classList.remove("hidden");
      valid = false;
    } else {
      emailError.classList.add("hidden");
    }
  } else {
    emailError.classList.remove("hidden");
    valid = false;
  }
  if (password.value.trim() !== "") {
    if (password.value.length <= 9) {
      passwordError.classList.remove("hidden");
      valid = false;
    } else {
      passwordError.classList.add("hidden");
    }
  } else {
    passwordError.classList.remove("hidden");
    valid = false;
  }

  if (confirmedpassword.value.trim() !== "") {
    if (confirmedpassword.value.trim() !== password.value.trim()) {
      passwordConfirmError.classList.remove("hidden");
      valid = false;
    } else {
      passwordConfirmError.classList.add("hidden");
    }
  } else {
    passwordConfirmError.classList.remove("hidden");
    valid = false;
  }

  if (valid) {
    localStorage.setItem("firstName", firstName.value.trim());
    localStorage.setItem("LastName", lastName.value.trim());
    localStorage.setItem("email", email.value.trim());
    localStorage.setItem("password", password.value.trim());
    localStorage.setItem("confirmedPassword", confirmedpassword.value.trim());
    window.location.href = "login.html";
  }
}

function valid(iconId) {
  document
    .querySelector(`#${iconId}`)
    .classList.remove("fa-regular", "fa-circle-xmark");
  document
    .querySelector(`#${iconId}`)
    .classList.add("fa-regular", "fa-circle-check");
  document.querySelector(`#${iconId}`).classList.remove("hidden");
}

function notValid(iconId) {
  document.querySelector(`#${iconId}`).classList.remove("hidden");
  document
    .querySelector(`#${iconId}`)
    .classList.add("fa-regular", "fa-circle-xmark");
}

function checkFirstName(xthis, iconId) {
  if (!regextext.test(xthis.value) || xthis.value === "") {
    notValid(iconId);
  } else {
    valid(iconId);
  }
}
function checklastName(xthis, iconId) {
  if (!regextext.test(xthis.value) || xthis.value === "") {
    notValid(iconId);
  } else {
    valid(iconId);
  }
}
function checkEmail(xthis, iconId) {
  if (!regEmail.test(xthis.value) || xthis.value === "") {
    notValid(iconId);
  } else {
    valid(iconId);
  }
}
function checkPassword(xthis, iconId) {
  if (xthis.value.length <= 9 || xthis.value === "") {
    notValid(iconId);
    console.log("j");
  } else {
    valid(iconId);
  }
}

function checkConfirmedPassword(xthis, iconId) {
  if (xthis.value !== password.value || xthis.value === "") {
    notValid(iconId);
  } else {
    valid(iconId);
  }
}
SignUp.addEventListener("click", save);
