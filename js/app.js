function Calculator() {
  this.history = [];
  this.actions = {
    "+": (a, b) => this.add(a, b),
    "-": (a, b) => this.subtract(a, b),
    "*": (a, b) => this.multiplay(a, b),
    "/": (a, b) => this.divide(a, b),
    "^": (a, b) => this.power(a, b),
  };
}

Calculator.prototype.isCorrectAction = function (action) {
  return typeof this.actions[action] === "function";
};

Calculator.prototype.getHistoryAsString = function () {
  return this.history.join("\n");
};

Calculator.prototype.add = function (num1, num2) {
  const res = num1 + num2;
  this.history.push(`${num1} + ${num2} = ${res}`);
};

Calculator.prototype.subtract = function (num1, num2) {
  const res = num1 - num2;
  this.history.push(`${num1} - ${num2} = ${res}`);
};
Calculator.prototype.multiplay = function (num1, num2) {
  const res = num1 * num2;
  this.history.push(`${num1} * ${num2} = ${res}`);
};

Calculator.prototype.divide = function (num1, num2) {
  if (num2 === 0) {
    this.history.push(`Error: Cannot divide by zero.`);
  } else {
    const res = num1 / num2;
    this.history.push(`${num1} / ${num2} = ${res}`);
  }
};

Calculator.prototype.power = function (num1, num2) {
  let str = num1;
  let res = 1;
  let i = 1;
  while (i < num2) {
    str += ` * ${num1}`;
    res *= num1;
    i++;
  }

  this.history.push(`${str} = ${res}`);
};
Calculator.prototype.isNumInputValid = function (num1, num2) {
  if (
    typeof num1 === "number" &&
    !isNaN(num1) &&
    typeof num2 === "number" &&
    !isNaN(num2)
  ) {
    return true;
  }
};

Calculator.prototype.calc = function (num1, num2, action) {
  num1 = +num1;
  num2 = +num2;

  if (this.isNumInputValid(num1, num2)) {
    const operationFunc = this.actions[action];
    if (typeof operationFunc === "function") {
      operationFunc(num1, num2);
    }
  }
};

const calc = new Calculator();
let action, promptContent, isCorrectAction, number1, number2;
do {
  promptContent =
    "Podaj jaką operację chcesz wykonać (+, -, *, /, ^) i potwierdź. \n"; // \n - znak nowej linii
  promptContent += "Jeśli chcesz zrezygnować wciśnij Anuluj. \n";
  promptContent += "Lista poprzednich operacji: \n" + calc.getHistoryAsString();

  action = prompt(promptContent);
  isCorrectAction = calc.isCorrectAction(action);
  if (isCorrectAction) {
    number1 = prompt("Podaj liczbę nr 1");
    number2 = prompt("Podaj liczbę nr 2");

    calc.calc(number1, number2, action);
  }
} while (calc.isCorrectAction(action));
