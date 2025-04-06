function Calculator() {
  this.actions = ["+", "-", "*", "/", "^"];
  this.history = [];
}

Calculator.prototype.isCorrectAction = function (action) {
  return this.actions.includes(action);
};

Calculator.prototype.getHistoryAsString = function () {
  return this.history.join("\n");
};

Calculator.prototype.add = function (num1, num2) {
  const res = num1 + num2;
  this.history.push(`${num1} + ${num2} = ${res}`);
};

Calculator.prototype.sub = function (num1, num2) {
  const res = num1 - num2;
  this.history.push(`${num1} - ${num2} = ${res}`);
};
Calculator.prototype.mul = function (num1, num2) {
  const res = num1 * num2;
  this.history.push(`${num1} * ${num2} = ${res}`);
};

Calculator.prototype.div = function (num1, num2) {
  if (num2 === 0) {
    this.history.push(`Error: Cannot divide by zero.`);
  } else {
    const res = num1 / num2;
    this.history.push(`${num1} / ${num2} = ${res}`);
  }
};

Calculator.prototype.pwr = function (num1, num2) {
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

Calculator.prototype.calc = function (num1, num2, action) {
  num1 = +num1;
  num2 = +num2;

  if (
    typeof num1 === "number" &&
    !isNaN(num1) &&
    typeof num2 === "number" &&
    !isNaN(num2)
  ) {
    switch (action) {
      case "+":
        this.add(num1, num2);
        break;
      case "-":
        this.sub(num1, num2);
        break;
      case "*":
        this.mul(num1, num2);
        break;
      case "/":
        this.div(num1, num2);
        break;
      case "^":
        this.pwr(num1, num2);
        break;
      default:
        console.log("Unknown operator");
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
