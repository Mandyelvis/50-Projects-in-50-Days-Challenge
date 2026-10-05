id="4d1q0v"
const timeElement = document.getElementById("time");
const periodElement = document.getElementById("period");
const dateElement = document.getElementById("date");

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    timeElement.textContent =
        `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    periodElement.textContent = period;

    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    dateElement.textContent = now.toLocaleDateString(
        "en-US",
        dateOptions
    );
}

updateClock();

setInterval(updateClock, 1000);

