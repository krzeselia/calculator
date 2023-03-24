let result;

function add(a, b) {
    result = a + b;
};

function subtract(a, b) {
    result = a - b;
};

function multiply(a, b) {
    result = a * b;
};

function divide(a, b) {
    result = a / b;
};

// function shortenResult() {
//     if (!Number.isInteger(result)) {

//     }
// }

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            add(num1, num2);
            break;
        case "–":
            subtract(num1, num2);
            break;
        case "×":
            multiply(num1, num2)
            break;
        case "÷":
            divide(num1, num2);
            break;
        default:
            console.log("help");
            break;
    }
}

const bigText = document.querySelector(".bigtext");
let bigDisplayValue = 0;
bigText.textContent = bigDisplayValue;

const smallText = document.querySelector(".smalltext");
let smallDisplayValue = "";

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", reset);

function reset() {
    bigText.classList.remove("bigtext2");
    bigText.classList.add("bigtext");
    bigDisplayValue = 0;
    bigText.textContent = bigDisplayValue;
    smallDisplayValue = ""
    smallText.textContent = smallDisplayValue;
    result = "";
}

const backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener("click", deleteLast);

function deleteLast() {
    if (bigDisplayValue == "") {
        if (smallDisplayValue.slice(-2, -1) == " ") {
            bigText.classList.remove("bigtext2");
            bigText.classList.add("bigtext");
            bigDisplayValue = smallDisplayValue.slice(0, -2);
            smallDisplayValue = "";
        } else {
            smallDisplayValue = smallDisplayValue.slice(0, -1);
        }
    } else {
        bigDisplayValue = bigDisplayValue.slice(0, -1);
    }

    if (bigDisplayValue == "" && smallDisplayValue == "") {
        reset();
    }

    bigText.textContent = bigDisplayValue;
    smallText.textContent = smallDisplayValue;
}

const numberButtons = document.querySelectorAll(".button");
numberButtons.forEach(button => button.addEventListener("click", function () {
    writeNumbers(this.textContent);
}));

function writeNumbers(num) {
    // number can't be more than 7 characters long
    if (!(bigText.textContent[6] == undefined)) {
        return;
        // you can't write multiple dots
    } else if (num == "." && bigDisplayValue.includes(".")) {
        return;
    } else if (bigDisplayValue === 0 && !(num == ".")) {
        bigDisplayValue = num;
    }
    else {
        bigDisplayValue = bigDisplayValue + num;
    }

    bigText.textContent = bigDisplayValue;
}

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(operator => operator.addEventListener("click", useOperators));

function useOperators() {
    let operator = this.textContent;
    let lastUsedOperator = smallDisplayValue.slice(-1);

    //if you pressed an operator for the first time
    if (smallDisplayValue == "") {
        bigText.classList.remove("bigtext");
        bigText.classList.add("bigtext2");
        smallDisplayValue = `${bigDisplayValue} ${operator}`;
        bigDisplayValue = "";
    }
    else {
        // correcting a misclicked operator
        if (bigDisplayValue == "") {
            smallDisplayValue = `${smallDisplayValue.slice(0, -1)} ${operator}`;
        }
        // if you used backspace and there's no operator
        else if (lastUsedOperator == " ") {
            smallDisplayValue = `${smallDisplayValue}${operator}`;
        } else if (lastUsedOperator == "÷" && bigDisplayValue == 0) {
            alert("Stop it.");
        } else {
            operate(lastUsedOperator, parseFloat(smallDisplayValue.slice(0, -2)), parseFloat(bigDisplayValue));

            bigDisplayValue = "";
            smallDisplayValue = `${result} ${operator}`;
        }
    }

    smallText.textContent = smallDisplayValue;
    bigText.textContent = bigDisplayValue;
}

const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", calculateTotal);

function calculateTotal() {
    let lastUsedOperator = smallDisplayValue.slice(-1);
    if (bigDisplayValue == "") {
        return;
    } else if (lastUsedOperator == "÷" && bigDisplayValue == 0) {
        alert("Stop it.");
    } else {
        operate(lastUsedOperator, parseFloat(smallDisplayValue.slice(0, -2)), parseFloat(bigDisplayValue));

        bigText.classList.remove("bigtext2");
        bigText.classList.add("bigtext");
        bigDisplayValue = result;
        bigText.textContent = bigDisplayValue;
        smallDisplayValue = "";
        smallText.textContent = smallDisplayValue;
    }
}