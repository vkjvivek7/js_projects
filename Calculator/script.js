class Calculator {
  constructor(previousOperandTextElement,
    currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }

  delete() {
    const data = this.currentOperand.toString()
    this.currentOperand = data.slice(0, - 1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperand(operation) {
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    if (
      !this.operation ||
      !this.previousOperand ||
      !this.currentOperand
    ) return;

    switch (this.operation) {
      case "+":
        this.currentOperand = +this.previousOperand + +this.currentOperand;
        break;
      case "÷":
        this.currentOperand = +this.previousOperand / +this.currentOperand;
        break;
      case "-":
        this.currentOperand = +this.previousOperand - +this.currentOperand;
        break;
      case "*":
        this.currentOperand = +this.previousOperand * +this.currentOperand;
        break;
      default:
        return 0;
    }
    this.previousOperand = '';
    this.operation = undefined;
  }

  updateDisplay() {
    let prevOperand = this.previousOperand.toString();
    if (this.operation) prevOperand = `${prevOperand} ${this.operation.toString()}`;
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = prevOperand;
  }
}





const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButtons = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement,
  currentOperandTextElement);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })

})

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperand(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButtons.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
})

deleteButtons.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})

allClearButtons.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})