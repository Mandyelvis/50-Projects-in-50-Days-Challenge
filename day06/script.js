const countElement = document.getElementById("count");
const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");
const resetButton = document.getElementById("reset");
const statusElement = document.getElementById("status");

let count = 0;

function updateCounter() {
    countElement.textContent = count;

    if (count > 0) {
        statusElement.textContent = "Counter is positive";
    } else if (count < 0) {
        statusElement.textContent = "Counter is negative";
    } else {
        statusElement.textContent = "Counter is at zero";
    }
}

increaseButton.addEventListener("click", function () {
    count++;
    updateCounter();
});

decreaseButton.addEventListener("click", function () {
    count--;
    updateCounter();
});

resetButton.addEventListener("click", function () {
    count = 0;
    updateCounter();
});

updateCounter();