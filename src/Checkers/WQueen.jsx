import React from "react";
import { useDrag } from "react-dnd";
import damaB from "../assets/imgs/dama blanca.png";
import "./checkers.css";
import { checkTurn } from "../Checkers/GameRules";

const WQueen = ({ color, id }) => {
  const turn=checkTurn();
  const [{ canDrag, isDragging }, drag] = useDrag({
    canDrag: (turn==="w"),
    item: { type: "queen", id: id },
    collect: (monitor) => ({
      canDrag: !!monitor.canDrag(),
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <img
      color={color}
      id={id}
      className='pieceSize'
      ref={drag}
      src={damaB}
      alt=''
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: canDrag ? (isDragging ? "grabbing" : "grab") : "not-allowed",
      }}
    />
  );
};
export default WQueen;
