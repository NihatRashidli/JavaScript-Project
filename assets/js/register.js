document.addEventListener("DOMContentLoaded", () => {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let form = document.querySelector("form");
  let name = document.querySelector("#name");
  let surname = document.querySelector("#surname");
  let username = document.querySelector("#username");
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let passwordConfirm = document.querySelector("#passwordConfirm");

  function validateUsername() {
    const usernamePattern = /^[a-zA-Z0-9_-]{3,20}$/;
    return usernamePattern.test(username.value);
  }

  function validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email.value);
  }

  function validatePassword() {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;
    return passwordPattern.test(password.value);
  }

  function validateConfirmPassword() {
    return password.value === passwordConfirm.value;
  }

  function register(e) {
    e.preventDefault();

    let id = uuidv4();

    if (!validateUsername()) {
      toasts("İstifadəçi adı düzgün formatda deyil!");
      return;
    }

    if (!validateEmail()) {
      toasts("E-poçt düzgün formatda olmalıdır!");
      return;
    }

    if (!validatePassword()) {
      toasts(
        "Şifrə minimum 8 simvol olmalı, ən az bir böyük hərf, bir kiçik hərf, bir rəqəm və bir xüsusi simvol ( @, #, $, %, & ) daxil olmalıdır."
      );
      return;
    }

    if (!validateConfirmPassword()) {
      toasts("Şifrələr uyğun deyil!");
      return;
    }

    if (
      !name.value.trim() ||
      !surname.value.trim() ||
      !username.value.trim() ||
      !email.value.trim() ||
      !password.value ||
      !passwordConfirm.value
    ) {
      toasts("Bütün sahələr doldurulmalıdır!");
      return;
    }

    let uniqueUser = users.some(
      (user) => user.username === username.value || user.email === email.value
    );

    if (uniqueUser) {
      toasts("İstifadəçi adı və ya E-poçt artıq mövcuddur!");
      return;
    }

    let newUser = {
      name: name.value.trim(),
      surname: surname.value.trim(),
      username: username.value.trim(),
      email: email.value.trim(),
      password: password.value,
      isLogined: false,
      id: id,
      wishlist: [],
      basket: [],
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    toasts("İstifadəçi uğurla qeydiyyatdan keçdi!");
    form.reset();
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
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

  form.addEventListener("submit", register);
});
