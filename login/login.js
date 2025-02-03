let email = document.getElementById("email");
let password = document.getElementById("passwordLogin");
let login = document.getElementById("login");
let emailError = document.querySelector(".emailError");
let passwordError = document.querySelector(".passwordError");
let form = document.querySelector(".form");

login.addEventListener("click", function (e) {
  let isValid = true;
  e.preventDefault();

  if (email.value.trim() !== localStorage.getItem("email")) {
    emailError.classList.remove("hidden");
    isValid = false;
  } else {
    emailError.classList.add("hidden");
  }

  if (password.value !== localStorage.getItem("password")) {
    passwordError.classList.remove("hidden");
    isValid = false;
  } else {
    passwordError.classList.add("hidden");
  }

  if (isValid) {
    window.location.href = "../Exam Start/startExam.html";
  }
});
