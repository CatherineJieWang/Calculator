import React, { useState, Fragment } from "react";
import Calculate from "./util/Calculate.js";
import Result from "./components/Result";
import Button from "./components/Button";
import History from "./components/History";
import "./Calculator.scss";
import useWindowSize from "./util/useWindowSize.js";

export default function Calculator() {
  const [display, setDisplay] = useState(0);
  const calculate = useState(new Calculate());
  const size = useWindowSize();
  const normalCal = [
    calculate[0].clearable ? "C" : "AC",
    "+/-",
    "%",
    "\u00F7",
    "7",
    "8",
    "9",
    "x",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "="
  ];
  const scientificCal = [
    "(",
    ")",
    "mc",
    "m+",
    "m-",
    "mr",
    "2nd",
    "x²",
    "x^3",
    "x^y",
    "e^x",
    "10^x",
    "1/x",
    "√",
    "√",
    "√",
    "ln",
    "log",
    "x!",
    "sin",
    "cos",
    "tan",
    "e",
    "EE",
    "Rad",
    "sinh",
    "cosh",
    "tanh",
    "PI",
    "Rand"
  ];
  function updateLocal(value) {
    let cal = localStorage.getItem("Calculate") || "";
    cal = (cal===""?cal+value: cal + "," + value);
    localStorage.setItem("Calculate", cal);
  }
  function handleButtonClick(value) {
    setDisplay(calculate[0].calculate(value, updateLocal));
  }
  function openHistory() {
    const curhistory = document.getElementById("history");
    if (curhistory.style.display === "block") {
      curhistory.style.display = "none";
    } else {
      curhistory.style.display = "block";
    }
  }

  return (
    <div className="calculator">
      <Result display={display} />
      <div className="openbtn" onClick={() => openHistory()}>
        ☰ Toggle History
      </div>
      <History />
      <div style={{ marginLeft: "auto", display: "flex" }}>
        <div>
          {size.width >= 1100 &&
            scientificCal.map((data, index) =>
              (index + 1) % 6 === 0 ? (
                <Fragment key={index}>
                  <Button value={data} className="Button GrayButton" />
                  <br />
                </Fragment>
              ) : (
                <Button
                  value={data}
                  key={index}
                  className="Button GrayButton"
                />
              )
            )}
        </div>
        <div>
          {normalCal.map((data, index) =>
            (index + 1) % 4 === 0 ? (
              <Fragment key={index}>
                <Button
                  value={data}
                  className="Button OrangeButton"
                  onClick={() => handleButtonClick(data)}
                />
                <br />
              </Fragment>
            ) : (
              <Button
                value={data}
                key={index}
                className={`Button ${
                  index < 3
                    ? "BlackButton"
                    : data === "0"
                    ? "GrayButton LargeButton"
                    : "GrayButton"
                }`}
                onClick={() => handleButtonClick(data)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
