import React, { useState } from "react";
import "./App.scss";
import schema from "./assets/schema";
import { evaluate, format } from "mathjs";

import Display from "./components/display/Display";
import Buttons from "./components/buttons/Buttons";

function App() {
  const [result, setResult] = useState(0);
  const [active, setActive] = useState("");
  const [memory, setMemory] = useState({
    operator: "+",
    total: 0,
    lastWasEqual: false,
  });

  function reset() {
    setResult(0);
    setActive("");
    setMemory({ operator: "", total: 0, lastWasEqual: false });
  }

  function calculateOperation(operand1, operand2, operator) {
    const operationString = operand1 + operator + operand2;
    return format(evaluate(operationString), {
      precision: 14,
    });
  }

  function pushBtn(symbol) {
    switch (symbol) {
      case "c":
        reset();
        break;
      case ".":
      case "%":
        break;
      case "=":
        setActive("");
        if (!memory.lastWasEqual) {
          setMemory((prevMemory) => {
            return {
              operator: prevMemory.operator,
              total: parseInt(result),
              lastWasEqual: true,
            };
          });

          setResult((prevResult) => {
            return calculateOperation(
              memory.total,
              prevResult,
              memory.operator
            );
          });
        } else {
          setResult((prevResult) => {
            return calculateOperation(
              prevResult,
              memory.total,
              memory.operator
            );
          });
        }

        break;
      case "+":
      case "-":
      case "*":
      case "/":
        setMemory((prevMemory) => {
          let total = 0;
          if (active !== "") {
            total = prevMemory.total;
          } else if (prevMemory.lastWasEqual) {
            total = result;
          } else {
            total = calculateOperation(
              result,
              prevMemory.total,
              prevMemory.operator
            );
          }
          return { operator: symbol, total: total, lastWasEqual: false };
        });
        setActive(symbol);
        break;
      default:
        console.log(memory.lastWasEqual);
        console.log(result === 0);
        console.log(active !== "");

        if (memory.lastWasEqual || result === 0 || active !== "") {
          setResult(symbol);
        } else {
          setResult((prevResult) => prevResult + symbol);
        }
        setActive("");
    }
  }
  console.log("--------");
  console.log("result", result);
  console.log("active", active);
  console.log("memory", memory);
  return (
    <div className="App">
      <Display result={result} />
      <Buttons pushBtn={pushBtn} schema={schema} active={active} />
    </div>
  );
}

export default App;
