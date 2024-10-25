const numberElement = document.querySelectorAll(".number");
const operatorElement = document.querySelectorAll(".operator");
const displayElement = document.querySelector(".calculator-display");
const resultElement = document.querySelector(".calculator-result");
const modeToggleElement = document.querySelector(".mode-toggle");

let isDarkMode = false;
let inputValueOne = "";
let inputValueTwo = "";
let inputOperator;
let isOperatorPresent = false;
let result = 0;
let isDoneCalculation = false;

numberElement.forEach((numbers) => {
  numbers.addEventListener("click", () => {
    const { key } = numbers.dataset;

    numberOperation(key);
  });
});

operatorElement.forEach((operator) => {
  operator.addEventListener("click", () => {
    const { key } = operator.dataset;

    operatorOperation(key);
    key === "=" && calculation();
    key === "b" && backspace();
    key === "c" && clearEverything();
  });
});

function numberOperation(value) {
  if (isDoneCalculation) {
    clearEverything(value);
  }
  display(value);
  const addToNumberQuery = () => {
    if (!isOperatorPresent) {
      inputValueOne += value;
    } else {
      inputValueTwo += value;
    }
  };
  addToNumberQuery();
}

function operatorOperation(value) {
  if (isDoneCalculation) {
    let prevResult = result;
    clearEverything();
    inputValueOne = prevResult;
    displayElement.value = prevResult;
  }

  if (!inputValueTwo) {
    if (value !== "b" && value !== "=") {
      display(value);
    }

    if (value === "x") {
      inputOperator = "*";
      isOperatorPresent = true;
    } else if (value !== "=") {
      inputOperator = value;
      isOperatorPresent = true;
    }
  }
}
function display(value) {
  displayElement.value += value;
}

function calculation() {
  stringToNumber();
  switch (inputOperator) {
    case "+":
      addition();
      break;
    case "-":
      subtraction();
      break;
    case "*":
      multiplication();
      break;
    case "/":
      division();
      break;
  }
  resultElement.value = result;
  isDoneCalculation = true;
}
function stringToNumber() {
  inputValueOne = Number(inputValueOne);
  inputValueTwo = Number(inputValueTwo);
}

function addition() {
  result = inputValueOne + inputValueTwo;
}
function subtraction() {
  result = inputValueOne - inputValueTwo;
}
function multiplication() {
  result = inputValueOne * inputValueTwo;
}
function division() {
  result = inputValueOne / inputValueTwo;
}
console.log(inputValueOne);

function clearEverything() {
  result = 0;
  inputValueOne = "";
  inputValueTwo = "";
  inputOperator;
  isOperatorPresent = false;

  isDoneCalculation = false;
  resultElement.value = "";
  displayElement.value = "";
}

function backspace() {
  if (displayElement.value.length > 0) {
    displayElement.value = displayElement.value.slice(0, -1);

    if (!isOperatorPresent) {
      inputValueOne = inputValueOne.slice(0, -1);
    } else if (inputValueTwo.length > 0) {
      inputValueTwo = inputValueTwo.slice(0, -1);
    } else {
      isOperatorPresent = false;
      inputOperator = undefined;
    }
  }
}

modeToggleElement.addEventListener("click", () => {
  const container = document.querySelector(".container");

  if (!isDarkMode) {
    container.classList.add("dark-mode");
    isDarkMode = true;
  } else {
    container.classList.remove("dark-mode");
    isDarkMode = false;
    console.log("c");
  }
});
