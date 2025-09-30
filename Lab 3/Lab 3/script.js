// Variables to track calculator state
let currentDisplay = '0';
let firstNumber = null;
let currentOperator = null;
let waitingForSecondNumber = false;
let lastOperator = null;
let lastSecondNumber = null;

// Get elements
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.getElementById('clear');
const decimalButton = document.querySelector('.decimal');

// Update display
function updateDisplay() {
    display.textContent = currentDisplay;
}

// Clear all
function clearAll() {
    currentDisplay = '0';
    firstNumber = null;
    currentOperator = null;
    waitingForSecondNumber = false;
    lastOperator = null;
    lastSecondNumber = null;
    removeActiveOperator();
    updateDisplay();
}

// Remove active class from all operators
function removeActiveOperator() {
    operatorButtons.forEach(btn => btn.classList.remove('active'));
}

// Handle number click
function handleNumberClick(number) {
    removeActiveOperator();
    
    if (waitingForSecondNumber) {
        currentDisplay = number;
        waitingForSecondNumber = false;
    } else {
        if (currentDisplay === '0') {
            currentDisplay = number;
        } else {
            currentDisplay += number;
        }
    }
    updateDisplay();
}

// Handle operator click
function handleOperatorClick(operator, button) {
    const currentValue = parseFloat(currentDisplay);

    // If we already have a first number and operator, calculate first
    if (firstNumber !== null && currentOperator !== null && !waitingForSecondNumber) {
        const secondNumber = currentValue;
        const result = calculate(firstNumber, secondNumber, currentOperator);
        currentDisplay = String(result);
        firstNumber = result;
        lastSecondNumber = secondNumber;
        lastOperator = currentOperator;
    } else {
        firstNumber = currentValue;
    }

    currentOperator = operator;
    waitingForSecondNumber = true;
    
    removeActiveOperator();
    button.classList.add('active');
    
    updateDisplay();
}

// Handle equals click
function handleEqualsClick() {
    removeActiveOperator();
    
    if (firstNumber === null) {
        return;
    }

    let secondNumber;
    
    // If equals is pressed again, use the last operation
    if (waitingForSecondNumber && lastOperator !== null && lastSecondNumber !== null) {
        firstNumber = parseFloat(currentDisplay);
        secondNumber = lastSecondNumber;
        currentOperator = lastOperator;
    } else {
        secondNumber = parseFloat(currentDisplay);
        lastSecondNumber = secondNumber;
        lastOperator = currentOperator;
    }

    if (currentOperator !== null) {
        const result = calculate(firstNumber, secondNumber, currentOperator);
        currentDisplay = String(result);
        firstNumber = result;
        waitingForSecondNumber = true;
        updateDisplay();
    }
}

// Calculate result
function calculate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : 0;
        default:
            return num2;
    }
}

// Handle decimal click
function handleDecimalClick() {
    removeActiveOperator();
    
    if (waitingForSecondNumber) {
        currentDisplay = '0.';
        waitingForSecondNumber = false;
    } else {
        // Only add decimal if there isn't one already
        if (!currentDisplay.includes('.')) {
            currentDisplay += '.';
        }
    }
    updateDisplay();
}

// Event listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleNumberClick(button.dataset.number);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleOperatorClick(button.dataset.operator, button);
    });
});

equalsButton.addEventListener('click', handleEqualsClick);
clearButton.addEventListener('click', clearAll);
decimalButton.addEventListener('click', handleDecimalClick);

// Initialize display
updateDisplay();