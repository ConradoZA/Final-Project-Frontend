import React from "react";
import { useDrop } from "react-dnd";
import Square from "./Square";
import { canMove, move } from "./GameRules";
import Overlay from "./Overlay";

const BoardSquare = ({ x, y, children }, props) => {
  const ISBLACK = (x + y) % 2 === 0;
  const TYPES = ["pawn", "queen"];
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: TYPES,
    canDrop: (item) => canMove(x, y, item),
    drop: () => move(x, y),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop}>
      <Square isBlack={ISBLACK}>{children}</Square>
      {isOver && !canDrop && <Overlay color='red' />}
      {!isOver && canDrop && <Overlay color='yellow' />}
      {isOver && canDrop && <Overlay color='green' />}
    </div>
  );
};

export default BoardSquare;
