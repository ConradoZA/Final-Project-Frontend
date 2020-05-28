import React from "react";
import { connect } from "react-redux";
import BoardSquare from "./BoardSquare.jsx";
import WPawn from "./WPawn";
import WQueen from "./WQueen";
import BPawn from "./BPawn";
import BQueen from "./BQueen";
import "./checkers.css";
import store from "../Redux/store";
import { setInitialPosition } from "../Redux/actions/checkerBoard.js";

const Board = (props) => {
  const state = store.getState();
  const tablePosition = state.checkerBoard.present.tablePosition;
  const SQUARES = [];
  let newGame = [];

  const createNewGamePieces = (i, x, y) => {
    if ((x + y) % 2 === 0 && y < 4) {
      newGame.push([x, y, "wp", i]);
    } else if ((x + y) % 2 === 0 && y > 5) {
      newGame.push([x, y, "bp", i]);
    }
    if (newGame.length === 40 && i === 0 && tablePosition.length === 0) {
      setInitialPosition(newGame);
    }
  };
  const crownPawn = (piece, y) => {
    if (y === 9 && piece[2] === "wp") {
      return [piece[0], piece[1], "wq", piece[3]];
    } else if (y === 0 && piece[2] === "bp") {
      return [piece[0], piece[1], "bq", piece[3]];
    }
  };
  const renderIfThereIsPiece = (i, x, y) => {
    if (props.start) {
      createNewGamePieces(i, x, y);
    }
    return tablePosition.map((piece) => {
      const id = piece[3];
      crownPawn(piece, y);
      if (x === piece[0] && y === piece[1]) {
        switch (piece[2]) {
          case "wp":
            return <WPawn color={"wp"} id={id} key={id} />;
          case "wq":
            return <WQueen color={"wq"} id={id} key={id} />;
          case "bp":
            return <BPawn color={"bp"} id={id} key={id} />;
          case "bq":
            return <BQueen color={"bq"} id={id} key={id} />;
          default:
            return <div>{x + ", " + y + " = " + i}</div>;
        }
      }
    });
  };
  const addSquare = (i) => {
    let X = i % 10;
    let Y = Math.floor(i / 10);
    return (
        <BoardSquare x={X} y={Y} key={i}>
          {renderIfThereIsPiece(i, X, Y)}
        </BoardSquare>
    );
  };
  const createBoard = () => {
    for (let i = 99; i >= 0; i--) {
      SQUARES.push(addSquare(i));
      if (i === 0) {
        return SQUARES;
      }
    }
  };

  return <div className='board'>{createBoard()}</div>;
};

const mapStateToProps = (state) => ({
  checkerBoard: state.checkerBoard.present.tablePosition,
});
export default connect(mapStateToProps)(Board);
// export default Board;
