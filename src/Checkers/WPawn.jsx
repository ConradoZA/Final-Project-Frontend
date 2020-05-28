import React from "react";
import { useDrag } from "react-dnd";
import peonB from "../assets/imgs/peon blanco.png";
import "./checkers.css";
import { checkTurn } from "../Checkers/GameRules";

const WPawn = ({ color, id }) => {
  const turn=checkTurn();
  const [{ canDrag, isDragging }, drag] = useDrag({
    canDrag: (turn==="w"),
    item: { type: "pawn", id: id },
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
      src={peonB}
      alt=''
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: canDrag ? (isDragging ? "grabbing" : "grab") : "not-allowed",
      }}
    />
  );
};
export default WPawn;
