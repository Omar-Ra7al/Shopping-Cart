import checkEmptey from "./inputsEmptey.js";
// Get user data From local Storage
let userDataObj = JSON.parse(localStorage.getItem("user-data"));
const userEmail = userDataObj.email;
const userPassword = userDataObj.password;

const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  checkEmptey();

  const inputEmail = document.getElementById("exampleInputEmail1").value;
  const inputPassWord = document.getElementById("exampleInputPassword1").value;
  if (inputEmail.trim() != "" && inputPassWord.trim() != "") {
    if (inputEmail === userEmail && inputPassWord === userPassword) {
      logIn();
    } else {
      const inputEmail = document.getElementById("exampleInputEmail1");
      const inputPassWord = document.getElementById("exampleInputPassword1");

      inputEmail.classList.add("shake");
      inputPassWord.classList.add("shake");
      setTimeout(() => {
        inputEmail.classList.remove("shake");
        inputPassWord.classList.remove("shake");
      }, 500);
    }
  }
});

function logIn() {
  localStorage.setItem("loged-in", true);
  window.location.href = "Pages/index.html";
}

if (localStorage.getItem("loged-in") == "true") {
  window.location.href = "Pages/index.html";
}
