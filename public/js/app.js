const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
let messageOne = document.querySelector("#message-1");
let messageTwo = document.querySelector("#message-2");
let icon = document.querySelector("#icon");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(`/weather?address=${search.value}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        icon.classList.remove("hidden");
        icon.src = data.icon;
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
  search.value = "";
});
