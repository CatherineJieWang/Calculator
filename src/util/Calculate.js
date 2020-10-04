
/**
 * todo: add useopen, add test, add scientific logic
 */
class Calculate {
  constructor() {
    this.currentNumber = "";
    this.previousInput = null;
    this.previousNumber = null;
    this.previousOperation = null;
    this.reuseNumber = null;
    this.reuseOperation = null;
    this.clearable = false;
    this.OperationSet = {
      addition: "+",
      subtraction: "-",
      multiplication: "x",
      division: "\u00F7",
      percentage: "%",
      sign: "+/-",
      equal: "=",
      allClear: "AC",
      clear: "C"
    };
  }

  updatePreviousStatus(number, input) {
    this.previousNumber = number;
    this.previousInput = input;
    this.previousOperation = input;
  }

  // Handle and process all digit inputs including .
  handleDigitInput(input) {
    this.clearable = true;

    if (this.isOperation(this.previousInput)) {
      this.currentNumber = "";
    }

    if (input === "." && this.containDecimalPoint(this.currentNumber)) {
      return this.currentNumber;
    }

    if (input === "." && this.currentNumber === "") {
      this.currentNumber = "0.";
      return this.currentNumber;
    }

    this.currentNumber += input;

    this.previousInput = input;

    return this.removeZero(this.currentNumber);
  }

  // Handle all operation other than digit inputs.
  handleOperationInput(input, updateLocal) {
    if (
      input === this.OperationSet.addition ||
      input === this.OperationSet.subtraction ||
      input === this.OperationSet.multiplication ||
      input === this.OperationSet.division
    ) {
      return this.handleBaiscMathOperation(input);
    }

    if (input === this.OperationSet.percentage) {
      return this.handlePercentageOperation();
    }

    if (input === this.OperationSet.sign) {
      return this.handleSignOperation();
    }

    if (input === this.OperationSet.allClear) {
      return this.handleAllClearOperation();
    }

    if (input === this.OperationSet.clear) {
      return this.handleClearOperation();
    }

    if (input === this.OperationSet.equal) {
      return this.handleEqualOperation(input, updateLocal);
    }
  }

  // Only handle basic +, -, /, x operations
  handleBaiscMathOperation(input) {
    this.reuseNumber = null;
    this.reuseOperation = null;

    if (this.previousNumber == null) {
      this.updatePreviousStatus(this.currentNumber, input);

      return this.currentNumber;
    } else {
      let temp = this.previousInput;
      this.previousInput = input;

      if (
        temp !== input &&
        this.previousOperation !== this.OperationSet.equal &&
        temp !== "="
      ) {
        if (this.previousOperation === this.OperationSet.addition) {
          this.currentNumber = this.add(
            this.previousNumber,
            this.currentNumber
          );
        }
        if (this.previousOperation === this.OperationSet.subtraction) {
          this.currentNumber = this.subtract(
            this.previousNumber,
            this.currentNumber
          );
        }
        if (this.previousOperation === this.OperationSet.multiplication) {
          this.currentNumber = this.muliply(
            this.previousNumber,
            this.currentNumber
          );
        }
        if (this.previousOperation === this.OperationSet.division) {
          this.currentNumber = this.divide(
            this.previousNumber,
            this.currentNumber
          );
        }

        this.updatePreviousStatus(this.currentNumber, input);

        return this.currentNumber;
      } else {
        this.updatePreviousStatus(this.currentNumber, input);

        return this.currentNumber;
      }
    }
  }

  handlePercentageOperation() {
    if (this.currentNumber === "") {
      this.currentNumber = "0";
    }

    this.currentNumber = this.percentage(this.currentNumber);

    return this.currentNumber;
  }

  handleSignOperation() {
    if (this.currentNumber === "") {
      this.currentNumber = "0";
    }

    this.currentNumber = this.changeSign(this.currentNumber);

    return this.currentNumber;
  }

  handleAllClearOperation() {
    return this.allClear();
  }

  handleClearOperation() {
    return this.clear();
  }

  // Paramter operation is one of add, subtract, multiply or divide
  perform(operation) {
    if (this.reuseNumber !== null) {
      this.currentNumber = operation(this.currentNumber, this.reuseNumber);
    } else {
      this.reuseNumber = this.currentNumber;
      this.currentNumber = operation(this.previousNumber, this.currentNumber);
    }
  }

  handleEqualOperation(input, updateLocal) {
    if (this.previousNumber == null) {
      this.updatePreviousStatus(this.currentNumber, input);

      return this.currentNumber;
    } else {
      this.previousInput = input;

      if (
        this.previousOperation !== this.OperationSet.equal &&
        input === this.OperationSet.equal
      ) {
        let temp = this.currentNumber;
        let tempstrequal = "";
        if (this.previousOperation === this.OperationSet.addition) {
          this.perform(this.add);
        }
        if (this.previousOperation === this.OperationSet.subtraction) {
          this.perform(this.subtract);
        }
        if (this.previousOperation === this.OperationSet.multiplication) {
          this.perform(this.muliply);
        }
        if (this.previousOperation === this.OperationSet.division) {
          this.perform(this.divide);
        }
        tempstrequal =
          tempstrequal +
          this.previousNumber +
          " " +
          this.previousOperation +
          " " +
          this.reuseNumber +
          " " +
          input +
          " " +
          this.currentNumber;
        updateLocal(tempstrequal);
        this.reuseNumber = temp;
        this.reuseOperation = this.previousOperation;
        this.previousInput = input;
        this.previousOperation = input;
        return this.currentNumber;
      } else {
        let temp = this.currentNumber;

        if (this.reuseNumber != null) {
          if (this.reuseOperation === this.OperationSet.addition) {
            this.currentNumber = this.add(this.currentNumber, this.reuseNumber);
          }
          if (this.reuseOperation === this.OperationSet.subtraction) {
            this.currentNumber = this.subtract(
              this.currentNumber,
              this.reuseNumber
            );
          }
          if (this.reuseOperation === this.OperationSet.multiplication) {
            this.currentNumber = this.muliply(
              this.currentNumber,
              this.reuseNumber
            );
          }
          if (this.reuseOperation === this.OperationSet.division) {
            this.currentNumber = this.divide(
              this.currentNumber,
              this.reuseNumber
            );
          }
        }

        this.updatePreviousStatus(temp, input);
        let tempstrreuse = "";
        tempstrreuse =
          tempstrreuse +
          this.reuseNumber +
          " " +
          this.reuseOperation +
          " " +
          this.previousNumber +
          " " +
          this.previousOperation +
          " " +
          this.currentNumber;
        updateLocal(tempstrreuse);

        return this.currentNumber;
      }
    }
  }

  calculate(input, updateLocal) {
    if (this.isDigit(input)) {
      return this.handleDigitInput(input);
    }

    if (this.isOperation(input)) {
      return this.handleOperationInput(input, updateLocal);
    }

    return "Error";
  }

  isDigit(input) {
    return !isNaN(input) || input === ".";
  }

  isOperation(input) {
    return Object.values(this.OperationSet).includes(input);
  }

  add(previousNumber, number) {
    return (parseFloat(previousNumber) + parseFloat(number)).toString();
  }

  subtract(previousNumber, number) {
    return (parseFloat(previousNumber) - parseFloat(number)).toString();
  }

  muliply(previousNumber, number) {
    return (parseFloat(previousNumber) * parseFloat(number)).toString();
  }

  divide(previousNumber, number) {
    return (parseFloat(previousNumber) / parseFloat(number)).toString();
  }

  percentage(number) {
    return (parseFloat(number) / 100).toString();
  }

  changeSign(number) {
    return parseFloat(number) === 0
      ? "0"
      : (parseFloat(number) * -1).toString();
  }

  clear() {
    this.previousInput = null;
    this.previousNumber = null;
    this.previousOperation = null;
    this.reuseNumber = null;
    this.reuseOperation = null;
    this.clearable = false;
    this.currentNumber = 0;
    return this.currentNumber;
  }

  allClear() {
    this.currentNumber = "";
    this.previousInput = null;
    this.previousNumber = null;
    this.previousOperation = null;
    this.reuseNumber = null;
    this.reuseOperation = null;
    this.clearable = false;
    return "0";
  }

  removeZero(number) {
    if (number.length > 1 && number[0] === "0" && number[1] !== ".") {
      return this.removeZero(number.substr(1, number.length));
    }

    return number;
  }

  containDecimalPoint(number) {
    return number.includes(".");
  }
}

export default Calculate;
