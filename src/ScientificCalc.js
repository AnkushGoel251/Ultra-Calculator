import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBoxScientific from "./components/ButtonScientific";
import Button from "./components/Button";


const btnValues = [
    ["C", "log", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    ["Sin","Cos","Tan","ArcSin"],
    ["ArcCos","10^X","X^2","X^Y"],
    [0, ".", "="],
  ];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const ScienitificCalc = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const singlexClickHandler = (e) => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num = Math.log(num)),
      res: (res = Math.log(res)),
      sign: "",
    });
  };

  const sinClickHandler = (e) => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num = Math.sin(num)),
      res: (res = Math.sin(res)),
      sign: "",
    });
  };

  const cosClickHandler = (e) => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num = Math.cos(num)),
      res: (res = Math.cos(res)),
      sign: "",
    });
  };

  const arcsinClickHandler = (e) => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num = Math.sinh(num)),
      res: (res = Math.sinh(res)),
      sign: "",
    });
  };

  const arccosClickHandler = (e) => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num = Math.cosh(num)),
      res: (res = Math.cosh(res)),
      sign: "",
    });
  };


  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : sign === "X^Y"
          ? Math.pow(a,b)
          : sign === "%"
          ? a % b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const tanClickHandler = (e) => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num = Math.tan(num)),
      res: (res = Math.tan(res)),
      sign: "",
    });
  };

  const pow10ClickHandler = (e) => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num = Math.pow(10,num)),
      res: (res = Math.pow(10,res)),
      sign: "",
    });
  };

  const pow2ClickHandler = (e) => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num = Math.pow(num,2)),
      res: (res = Math.pow(res,2)),
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBoxScientific>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+" || btn === "X^Y" || btn === "%"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : btn === "log" 
                  ? singlexClickHandler
                  : btn === "Sin"
                  ? sinClickHandler
                  : btn === "Cos"
                  ? cosClickHandler
                  : btn === "Tan"
                  ? tanClickHandler
                  : btn === "arcSin"
                  ? arcsinClickHandler
                  : btn === "arcCos"
                  ? arccosClickHandler
                  : btn === "X^2"
                  ? pow2ClickHandler
                  : btn === "10^X"
                  ? pow10ClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBoxScientific>
    </Wrapper>
  );
};

export default ScienitificCalc;