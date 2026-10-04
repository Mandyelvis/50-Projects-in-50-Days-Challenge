const display = document.getElementById("display");

function appendValue(value) {
    if (display.value === "Error") {
        display.value = "0";
    }

    if (display.value === "0" && value !== ".") {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "0";
}

function deleteLast() {
    if (display.value === "Error" || display.value.length === 1) {
        display.value = "0";
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    try {
        let expression = display.value.replace(/%/g, "/100");

        const result = Function(
            `"use strict"; return (${expression})`
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid calculation");
        }

        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}
