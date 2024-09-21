export default function checkEmptey() {
  document.querySelector("form").addEventListener("submit", function (event) {
    // Prevent send data
    event.preventDefault();
  });

  const allInputs = document.querySelectorAll("input");
  allInputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.classList.add("shake");
      setTimeout(() => {
        input.classList.remove("shake");
      }, 500);
    }
  });
}
