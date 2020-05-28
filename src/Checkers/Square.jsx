import React from "react";
import "./checkers.css";

const Square = ({ isBlack, children }) => {
  const backgroundColor = isBlack ? "black" : "white";
  const color = isBlack ? "white" : "black";
  return (
    <div className={backgroundColor} style={{ color }}>
      {children}
    </div>
  );
};

export default Square;
