import React from "react";
import { useDrag } from "react-dnd";
import damaN from "../assets/imgs/dama roja.png";
import "./checkers.css";
import { checkTurn } from "../Checkers/GameRules";

const BQueen = ({ color, id }) => {
  const turn=checkTurn();
  const [{ canDrag, isDragging }, drag] = useDrag({
    canDrag: (turn==="b"),
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
      src={damaN}
      alt=''
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: canDrag ? (isDragging ? "grabbing" : "grab") : "not-allowed",
      }}
    />
  );
};
export default BQueen;
