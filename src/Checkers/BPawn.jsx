import React from "react";
import { useDrag } from "react-dnd";
import "./checkers.css";
import { checkTurn } from "./Rules/GameRules";
import { API_URL_IMAGES } from "../api-config";

const BPawn = ({ color, id }) => {
  const turn = checkTurn();
  const [{ canDrag, isDragging }, drag] = useDrag({
    canDrag: turn === "b",
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
      src={API_URL_IMAGES+"peon rojo.png"}
      alt=''
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: canDrag ? (isDragging ? "grabbing" : "grab") : "not-allowed",
      }}
    />
  );
};
export default BPawn;
