document.addEventListener("DOMContentLoaded", () => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let form = document.querySelector("form");
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");

  function login(e) {
    e.preventDefault();

    if (users.length === 0) {
      toasts("No users found");
      return;
    }

    let findUser = users.find(
      (user) =>
        user.username === username.value && user.password === password.value
    );

    if (findUser) {
      findUser.isLogined = true;
      localStorage.setItem("users", JSON.stringify(users));
      toasts("User logged in successfully!");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    } else {
      toasts("Username or password is incorrect");
    }
  }

  function toasts(text) {
    Toastify({
      text: text,
      duration: 2000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }

  if (form) {
    form.addEventListener("submit", login);
  } else {
    console.error("Form element not found in the DOM.");
  }
});
