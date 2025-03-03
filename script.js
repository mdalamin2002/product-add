const ringButtons = document.querySelectorAll(".ring-button");

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
    productImage.src = "../images/" + color + ".png";
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
