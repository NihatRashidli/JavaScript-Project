document.addEventListener("DOMContentLoaded", () => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = users.find((user) => user.isLogined === true);

  if (!currentUser) {
    window.location.href = "login.html";
    toasts("Please login to access your wishlist");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
    return;
  }

  function createWishlistItem(product) {
    let wishlistItem = document.createElement("div");
    wishlistItem.classList.add("wishlist-item");

    let image = document.createElement("div");
    image.classList.add("image");
    let img = document.createElement("img");

    let title = document.createElement("h3");
    title.classList.add("title");

    let category = document.createElement("p");
    category.classList.add("category");

    let price = document.createElement("p");
    price.classList.add("price");

    let removeBtn = document.createElement("button");
    removeBtn.classList.add("btn", "btn-danger", "remove-btn");
    removeBtn.textContent = "Remove";

    removeBtn.addEventListener("click", () => {
      removeItem(product.id);
    });

    function removeItem(productId) {
      let userIndex = users.findIndex((user) => user.id === currentUser.id);
      if (userIndex !== -1) {
        let productIndex = currentUser.wishlist.findIndex(
          (product) => product.id === productId
        );
        if (productIndex !== -1) {
          currentUser.wishlist.splice(productIndex, 1);
          users[userIndex] = currentUser;
          localStorage.setItem("users", JSON.stringify(users));
          toasts("Item removed from wishlist");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    }

    image.appendChild(img);
    wishlistItem.append(image, title, category, price, removeBtn);

    let wishlistContainer = document.querySelector(".wishlist");
    wishlistContainer.appendChild(wishlistItem);

    img.src = product.image ? product.image : "default-image.jpg";
    title.textContent = product.title.slice(0, 20) + "...";
    category.textContent = product.category;
    price.textContent = `$${product.price}`;
  }

  if (currentUser.wishlist.length > 0) {
    currentUser.wishlist.forEach((product) => {
      createWishlistItem(product);
    });
  } else {
    let empty = document.createElement("h3");
    empty.classList.add("empty");
    empty.textContent = "Your wishlist is empty";
    let wishlistContainer = document.querySelector(".wishlist");
    wishlistContainer.appendChild(empty);
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
});
