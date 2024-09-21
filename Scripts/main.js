// << Start Login Get Stated Check >>
if (!localStorage.getItem("user-data")) {
  window.location.href = "Pages/get-started.html";
} else if (
  !localStorage.getItem("loged-in") ||
  localStorage.getItem("loged-in") == "false"
) {
  window.location.href = "Pages/login.html";
} else {
  // Add Welcome Msg
  const userDataObj = JSON.parse(localStorage.getItem("user-data"));
  document.querySelector(".user-name").innerHTML = `
${userDataObj.gender === "Male" ? "Mr" : "Ms"}
${userDataObj.firstName}
`;
}
// End Login Get Stated Check // >>

// << Start logOut
const logOut = document.querySelector(".log-out");
logOut.addEventListener("click", () => {
  localStorage.setItem("loged-in", false);
  window.location.href = "../Pages/login.html";
});
// End logOut //>>
