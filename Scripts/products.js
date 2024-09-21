// Check User found and login??
if (!localStorage.getItem("user-data")) {
  window.location.href = "../Pages/get-started.html";
} else if (
  !localStorage.getItem("loged-in") ||
  localStorage.getItem("loged-in") == "false"
) {
  window.location.href = "../Pages/login.html";
}

// << Start Products Page
const loading = document.querySelector(".load-overlay");
setTimeout(() => {
  // Sumuilat getting data
  document.body.removeChild(loading);
}, 1000);

let productsArr = JSON.parse(localStorage.getItem("products")) || [];
const productsContainer = document.querySelector(".products");
//   this condtion to not get data evrey load
//  the data will come onley when the products is not in local storage
if (!localStorage.getItem("products")) {
  fetch("../products.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data is set");
      localStorage.setItem("products", JSON.stringify(data.products));

      // Call the showData fn & give the array the LS value to show the products at frist time
      productsArr = JSON.parse(localStorage.getItem("products"));
      showProductsData();
    });
}

function showProductsData() {
  for (let i = 0; i < productsArr.length; i++) {
    const product = productsArr[i];
    // Set id into evrey product and save data agin into local storage
    product.id = i + 1;
    localStorage.setItem("products", JSON.stringify(productsArr));

    productsContainer.innerHTML += `
                    <div class="card col-md-6 p-0 position-relative border-0" style="width: 18rem;">
                        <div class="price position-absolute top0 start-50 translate-middle-x btn btn-primary">
                            ${product.price}$
                        </div>
                        <img src="${product.image}" class="card-img-top" alt="...">
                        <div class="card-body text-ce">
                        <p class="fs-5">${product.name}</p>
                            <p class="card-text">Some quick example text to build on the card title and make up the
                                bulk
                                of
                                the card's
                                content.</p>
                            <button 
                            onclick="addProductToCart(${i})"
                            class="btn btn-primary m-0 add d-flex justify-content-center align-items-center gap-3 w-100 border-0"
                                <p class="w-50">Add to cart</p>
                                <i class="bi bi-cart-check ms-3"></i>
                            </button>
                        </div>
                    </div>
                                `;
  }
}
showProductsData();
// End Products Page // >>

// _________________________________________________________________________ \\

// << Start Cart Page
const cartProducts = JSON.parse(localStorage.getItem("cart-products")) || [];
const cartPage = document.querySelector(".cart-page");
const cartIcon = document.querySelector(".cart-icon");
const cartNum = document.querySelector(".cart-num");
const productsNum = document.querySelector(".products-num");
const cartCost = document.querySelector(".total-cost");
cartIcon.addEventListener("click", () => {
  // Toggle cart page
  cartPage.classList.toggle("active");
  if (cartPage.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }
});

function showCartData() {
  //   Clear old productrt to prevent repeat the products
  cartPage.querySelector(".products").innerHTML = "";
  let totalCost = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    const product = cartProducts[i];
    totalCost += product.price;

    cartPage.querySelector(".products").innerHTML += `
    <div class="card col-md-6 p-0 flex-row overflow-hidden position-relative" style="width: 18rem;">
                        <div class="price position-absolute top0 start-0 btn btn-primary">
                            ${product.price}$
                        </div>
                        <img src=".${product.image}" class="card-img-top rounded-3" alt="...">
                        <div class="card-body text-center d-flex flex-column justify-content-between align-items-center ">
                        <p class="fs-5">${product.name}</p>
                            <button 
                            onclick="removeProductFromCart(${i})"
                            class="btn btn-danger m-0 add d-flex justify-content-center align-items-center gap-3"
                                <p class="w-50">Remove</p>
                                <i class="bi bi-cart-check ms-3"></i>
                            </button>
                        </div>
                    </div>
        `;
  }
  cartNum.innerHTML = cartProducts.length;
  productsNum.innerHTML = cartProducts.length;
  cartCost.innerHTML = `${totalCost.toFixed(2)}$`;
}
showCartData();

// End Cart Page // >>

// Add Product To Cart function
function addProductToCart(i) {
  //Prevent add same product twice
  const cardProduct = productsContainer.querySelectorAll(".card")[i];
  if (!cartProducts.some((product) => product.id === productsArr[i].id)) {
    cartProducts.push(productsArr[i]);

    // Ui
    animationState(cardProduct, "added");
    animationState(cartIcon, "added");
    popUpState("Product Added");
  } else {
    // Ui
    animationState(cardProduct, "shake");
    popUpState("Product In Your Cart");
  }

  localStorage.setItem("cart-products", JSON.stringify(cartProducts));
  // update cart evrey Remove
  showCartData();
}
// Remove Product funciton
function removeProductFromCart(i) {
  cartProducts.splice(i, 1);
  localStorage.setItem("cart-products", JSON.stringify(cartProducts));

  const cartItem = cartPage.querySelectorAll(".products .card")[i];
  animationState(cartItem, "remove");
  popUpState("Product Removed");

  //  Delay 1s to see the animation
  setTimeout(() => {
    // update cart evrey Remove
    showCartData();
  }, 1000);
}

function animationState(element, className) {
  element.classList.add(className);
  setTimeout(() => {
    element.classList.remove(className);
  }, 1000);
}

function popUpState(msg) {
  const popUp = document.querySelector(".popup");
  popUp.innerHTML = ` 
    <p class="m-0 fw-bold fs-6">${msg}</p>
    <i class="bi bi-bag-check-fill"></i>
    `;
  popUp.classList.add("active");
  setTimeout(() => {
    popUp.classList.remove("active");
  }, 1500);
}
