import productURL from "./baseURL.js";
import { deleteById, getDatas, postData, patchById } from "./request.js";

let products = await getDatas(productURL);

const createTable = async () => {
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  products.forEach((product) => {
    let tableRow = document.createElement("tr");

    let tdId = document.createElement("td");
    tdId.classList.add("product-id");

    let tdImage = document.createElement("td");
    let img = document.createElement("img");
    img.classList.add("product-image");
    tdImage.appendChild(img);

    let tdTitle = document.createElement("td");
    tdTitle.classList.add("product-title");

    let tdCategory = document.createElement("td");
    tdCategory.classList.add("product-category");

    let tdPrice = document.createElement("td");
    tdPrice.classList.add("product-price");

    let actions = document.createElement("td");

    let editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "Edit";

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", async () => {
      await deleteProduct(product.id);
      products = await getDatas(productURL);
      createTable();
      showToast("Product deleted successfully!");
    });

    editButton.addEventListener("click", () => {
      openEditModal(product);
    });

    tdId.textContent = product.id;
    img.src = product.image;
    tdTitle.textContent = product.title;
    tdCategory.textContent = product.category;
    tdPrice.textContent = `$${product.price}`;

    actions.append(editButton, deleteButton);
    tableRow.append(tdId, tdImage, tdTitle, tdCategory, tdPrice, actions);

    tbody.appendChild(tableRow);
  });
};

const addProduct = async (e) => {
  e.preventDefault();
  let image = document.querySelector("#image").value.trim();
  let title = document.querySelector("#title").value.trim();
  let category = document.querySelector("#category").value.trim();
  let price = parseFloat(document.querySelector("#price").value);

  let newProduct = {
    id: uuidv4(),
    image,
    title,
    category,
    price,
  };

  await postData(productURL, newProduct);
  products = await getDatas(productURL);
  createTable();
  closeModal();
  showToast("Product added successfully!");
};

let form = document.querySelector(".form");
form.addEventListener("submit", addProduct);

const deleteProduct = async (productId) => {
  await deleteById(productURL, productId);
};

const modal = document.querySelector(".row");
const content = document.querySelector(".content");
const closeButton = document.querySelector(".close");

const openModal = () => {
  let modal = document.querySelector(".row");
  modal.style.display = "flex";
  let back = document.querySelector(".blackBack");
  back.style.display = "block";
};

let addButton = document.querySelector(".add-btn");
addButton.addEventListener("click", openModal);

const closeModal = () => {
  modal.style.display = "none";
  let back = document.querySelector(".blackBack");
  back.style.display = "none";
};

addButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

let closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", closeModal);

const openEditModal = (product) => {
  openModal();

  document.querySelector("#image").value = product.image;
  document.querySelector("#title").value = product.title;
  document.querySelector("#category").value = product.category;
  document.querySelector("#price").value = product.price;

  form.removeEventListener("submit", editProduct);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await deleteProduct(product.id);
    let updatedProduct = {
      image: document.querySelector("#image").value.trim(),
      title: document.querySelector("#title").value.trim(),
      category: document.querySelector("#category").value.trim(),
      price: parseFloat(document.querySelector("#price").value),
    };

    await patchById(productURL, product.id, updatedProduct);
    products = await getDatas(productURL);
    createTable();
    closeModal();
    showToast("Product updated successfully!");

    form.removeEventListener("submit", arguments.callee);
    form.addEventListener("submit", editProduct);
  });
};

const editProduct = async (e) => {
  e.preventDefault();
  let image = document.querySelector("#image").value.trim();
  let title = document.querySelector("#title").value.trim();
  let category = document.querySelector("#category").value.trim();
  let price = parseFloat(document.querySelector("#price").value);

  let newProduct = {
    id: uuidv4(),
    image,
    title,
    category,
    price,
  };

  await postData(productURL, newProduct);
  products = await getDatas(productURL);
  createTable();
  closeModal();
  showToast("Product added successfully!");
};

createTable();
