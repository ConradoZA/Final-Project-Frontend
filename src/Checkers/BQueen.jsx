import React from "react";
import { useDrag } from "react-dnd";
import "./checkers.css";
import { API_URL_IMAGES } from "../api-config";
import { checkTurn } from "./Rules/GameRules";

const BQueen = ({ color, id }) => {
	const myTurn = checkTurn();
	const [{ canDrag, isDragging }, drag] = useDrag({
		canDrag: myTurn.includes("b"),
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
      src={API_URL_IMAGES+"dama roja.png"}
      alt=''
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: canDrag ? (isDragging ? "grabbing" : "grab") : "not-allowed",
      }}
    />
  );
};
export default BQueen;
