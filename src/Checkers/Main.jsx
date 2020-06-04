import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import Board from "./Board";
import "./checkers.css";
import { sendNewTablePosition } from "../Redux/actions/checkerBoardLocales";
import UndoRedo from "../Components/UndoRedo.jsx";

const Main = ({ checkerBoard }) => {
  const tablePosition = checkerBoard.present.tablePosition;
  console.log(tablePosition);
  const [start, setStart] = useState(false);
  const whiteTurn = checkerBoard.present.whiteTurn;

  const createNewGame = () => {
    setStart(true);
    setTimeout(() => {
      setStart(false);
    }, 100);
  };
  const crownPawn = () => {
    const lastPiece = tablePosition[-1];
    if (lastPiece[1] === 9 && whiteTurn && lastPiece[3] === "wp") {
      lastPiece[3] = "wq";
    } else if (lastPiece[1] === 0 && !whiteTurn && lastPiece[3] === "bp") {
      lastPiece[3] = "bq";
    }
  };

  const sendMove = () => {
    crownPawn();
    sendNewTablePosition(tablePosition, !whiteTurn);
  };

  return (
    <Fragment>
      {tablePosition.length === 1 ? (
        <button onClick={createNewGame}>Iniciar Partida</button>
      ) : (
        <span></span>
      )}
      <div className='container'>
        <Board start={start} />
        <UndoRedo />
      </div>
      <button onClick={sendMove}>Enviar Movimiento</button>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({ checkerBoard: state.checkerBoard });
export default connect(mapStateToProps)(Main);
