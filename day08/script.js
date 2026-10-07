const buyButton = document.getElementById("buyButton");

buyButton.addEventListener("click", function () {
    buyButton.textContent = "Added ✓";

    setTimeout(function () {
        buyButton.textContent = "Buy Now";
    }, 2000);
});