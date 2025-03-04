const ringButtons = document.querySelectorAll(".ring-button");

const productImageBase = "../images/";

for (let i = 0; i < ringButtons.length; i++) {
  const ringBtn = ringButtons[i];
  ringBtn.addEventListener("click", function (event) {
    const color = event.target.id.replace("-color", "");

    for (let j = 0; j < ringButtons.length; j++) {
      ringButtons[j].classList.remove("border-purple-600");
      ringButtons[j].classList.add("border-gray-300");
    }
    //color add kortesi
    event.target.classList.add("border-purple-600");
    event.target.classList.remove("border-gray-300");

    const productImage = document.getElementById("product-image");
    // productImage.src = "../images/gray.png";
    productImage.src = productImageBase + color + ".png";
  });
}

function selectWristSize(size) {
  const sizes = ["S", "M", "L", "XL"];

  for (let i = 0; i < sizes.length; i++) {
    const btn = document.getElementById("size-" + sizes[i]);

    const element = sizes[i];
    if (size === element) {
      btn.classList.add("border-purple-600");
    } else {
      btn.classList.remove("border-purple-600");
    }
  }
}

const quantityButtons = document.querySelectorAll(".quantity-button");
for (let i = 0; i < quantityButtons.length; i++) {
  const quantityBtn = quantityButtons[i];
  quantityBtn.addEventListener("click", function (event) {
    const amount = event.target.innerText === "+" ? 1 : -1;

    const quantityInput = document.getElementById("quantity");
    const currentQuantity = parseInt(quantityInput.innerText);

    const newQuantity = Math.max(0, currentQuantity + amount);

    quantityInput.innerText = newQuantity;
  });
}

//  add to cart btn
let cartCount = 0;
let cartItems = [];
document.getElementById("add-to-cart").addEventListener("click", function () {
  const quantity = parseInt(document.getElementById("quantity").innerText);
  if (quantity > 0) {
    document.getElementById("checkout-container").classList.remove("hidden");
    cartCount += quantity;
    document.getElementById("cart-count").innerText = cartCount;

    const selectedColorBtn = document.querySelector(".border-purple-600");
    // const selectedColor = selectedColorBtn.id.replace("-color", "");
    const selectedColor = selectedColorBtn.id.split("-")[0];
    const selectedSizeBtn = document.querySelector(
      ".border-purple-600:not(.ring-button)"
    );
    const selectedSize = selectedSizeBtn.innerText.split(" ")[0];

    const selectedPrice = selectedSizeBtn.innerText.split(" ")[1].split("$")[1];

    cartItems.push({
      image: selectedColor + ".png",
      title: " Classy Modern Smart Watch",
      color: selectedColor,
      size: selectedSize,
      price: quantity * parseInt(selectedPrice),
      quantity: quantity,
    });
  } else {
    alert("Please select quantity");
  }
});

document.getElementById("checkout-btn").addEventListener("click", function () {
  const cartModal = document.getElementById("cart-modal");
  cartModal.classList.remove("hidden");
  const cartItemsContainer = document.getElementById("cart-items");

  let totalPrice = 0;
  let totalItem = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    totalPrice = totalPrice + item.price;
    totalItem = totalItem + item.quantity;
    const row = document.createElement("tr");
    row.classList.add("border-b");
    row.innerHTML = `
    <td>
    <id class="flex items-center space-x-2">
    <img class="w-12 h-12 object-cover rounded-md" src="${productImageBase}${item.image}"alt="">
    <span class="font-semibold">${item.title}</span>

    
    </id>
    
    </td>
    <td class="text-center">${item.color}</td>
    <td class="text-center">${item.size}</td>
    <td class="text-center">${item.quantity}</td>
    <td class="text-center">$${item.price}</td>
    `;
    cartItemsContainer.appendChild(row);
  }
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
  <td> Total </td>
  <td></td>
  <td></td>
  <td class="text-center"> ${totalItem} </td>
  <td class="text-center"> $${totalPrice}</td>
  `;
  cartItemsContainer.appendChild(totalRow);
  // total price calculation & quantity
});
