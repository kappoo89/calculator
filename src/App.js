import React, { useState } from "react";
import "./App.scss";
import schema from "./assets/schema";
import { evaluate } from "mathjs";

import Display from "./components/display/Display";
import Buttons from "./components/buttons/Buttons";

function App() {
  const [result, setResult] = useState("0");
  const [active, setActive] = useState("");
  const [memory, setMemory] = useState({ operator: "", total: 0 });

  function reset() {
    setResult("0");
    setActive("");
    setMemory({ operator: "", total: 0 });
  }
  function calculateAll() {
    //calculateAll
    reset();
  }

  function pushBtn(symbol) {
    switch (symbol) {
      case "c":
        reset();
        break;
      case ",":
        setActive(symbol);
        setMemory([...memory, {}]);
        break;
      case "%":
        break;
      case "=":
        setActive("");
        setResult((prevResult) =>
          evaluate(memory.total + memory.operator + prevResult)
        );
        setMemory((prevMemory) => {
          return { operator: prevMemory.operator, total: result };
        });
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        if (active !== "") {
          setMemory((prevMemory) => {
            return { operator: symbol, total: prevMemory.total };
          });
        } else {
          setMemory((prevMemory) => {
            const total = evaluate(
              prevMemory.total + prevMemory.operator + result
            );
            return { operator: symbol, total: total };
          });
        }
        setActive(symbol);
        break;
      default:
        if (active !== "") {
          setActive("");
          setResult(symbol);
        } else {
          if (result === "0") {
            setResult(symbol);
          } else {
            setResult((prevResult) => prevResult + symbol);
          }
        }
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
