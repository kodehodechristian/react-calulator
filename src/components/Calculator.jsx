import React, { useState } from "react";
import * as math from "mathjs";
import Header from "./Header";
import Display from "./Display";
import KeyPad from "./KeyPad";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("399.981");
  const [pendingOperation, setPendingOperation] = useState(null);
  const [accumulatedValue, setAccumulatedValue] = useState(null);
  const [shouldClearDisplay, setShouldClearDisplay] = useState(false);

  const updateDisplayValue = (newValue, clear = false) => {
    setDisplayValue(newValue);
    setShouldClearDisplay(clear);
  };

  const handleNumericAndDecimalInput = (keyValue) => {
    if (shouldClearDisplay || displayValue === "0") {
      updateDisplayValue(keyValue);
    } else if (!(keyValue === "." && displayValue.includes("."))) {
      updateDisplayValue(displayValue + keyValue);
    }
  };

  const handleOperation = (operationValue, displayOperation) => {
    const inputValue = displayValue;
    if (pendingOperation && !shouldClearDisplay) {
      const result = calculate(accumulatedValue, pendingOperation, inputValue);
      setAccumulatedValue(result);
      updateDisplayValue(result + displayOperation, true);
    } else {
      setAccumulatedValue(inputValue);
      updateDisplayValue(inputValue + displayOperation, true);
    }
    setPendingOperation(operationValue);
  };

  const calculate = (accumulated, operation, current) => {
    try {
      return math.evaluate(`${accumulated} ${operation} ${current}`).toString();
    } catch (error) {
      return "Error";
    }
  };

  const handleEquals = () => {
    if (pendingOperation && accumulatedValue !== null) {
      const result = calculate(
        accumulatedValue,
        pendingOperation,
        displayValue
      );
      if (result !== "Error") {
        updateDisplayValue(result);
        setAccumulatedValue(result);
        setPendingOperation(null);
      } else {
        updateDisplayValue(result);
      }
    }
  };

  const handleKeyPress = (keyValue) => {
    const isNumeric = !isNaN(keyValue);
    const isDot = keyValue === ".";
    const isOperator =
      ["+", "-", "*", "/"].includes(keyValue) || keyValue === "x";

    if (isNumeric || isDot) {
      handleNumericAndDecimalInput(keyValue);
    } else if (isOperator) {
      // If input key is 'x', use '*' for mathjs, but keep 'x' for display
      const operationValue = keyValue === "x" ? "*" : keyValue;
      const displayOperation = keyValue === "x" ? " x " : ` ${keyValue} `;
      handleOperation(operationValue, displayOperation);
    } else if (keyValue === "=") {
      handleEquals();
    } else if (keyValue === "reset") {
      setDisplayValue("0");
      setAccumulatedValue(null);
      setPendingOperation(null);
      setShouldClearDisplay(false);
    } else if (keyValue === "del") {
      setDisplayValue(displayValue.slice(0, -1) || "0");
    }
  };

  return (
    <div className="calculator">
      <Header title="calc" />
      <Display value={displayValue} />
      <KeyPad onKeyPress={handleKeyPress} />
    </div>
  );
};

export default Calculator;
