import checkEmptey from "./inputsEmptey.js";

const submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  const firstName = document.getElementById("fristName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("inputEmail4").value;
  const password = document.getElementById("inputPassword4").value;
  const gender = document.getElementById("inputState").value;

  let userDataObj = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    gender: gender,
  };
  checkEmptey();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    gender.trim() !== ""
  ) {
    if (emailPattern.test(email)) {
      localStorage.setItem("user-data", JSON.stringify(userDataObj));
      localStorage.setItem("loged-in", false);
      // Go to Login Page
      window.location.href = "../Pages/login.html";
    } else {
      // animation shake to email if is not right
      const email = document.getElementById("inputEmail4");
      email.classList.add("shake");
      setTimeout(() => {
        email.classList.remove("shake");
      }, 500);
    }
  }
});

export let export1 = "export";
