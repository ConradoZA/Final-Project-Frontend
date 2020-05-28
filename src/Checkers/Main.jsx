import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import Board from "./Board";
import "./checkers.css";
import store from "../Redux/store";
import { sendNewTablePosition } from "../Redux/actions/checkerBoard";
import UndoRedo from "../Components/UndoRedo.jsx";

const Main = () => {
  const state = store.getState();
  const tablePosition = state.checkerBoard.present.tablePosition;
  const [start, setStart] = useState(false);

  const createNewGame = () => {
    setStart(true);
    setTimeout(() => {
      setStart(false);
    }, 100);
  };

  const sendMove = () => {
    const changeTurn = state.checkerBoard.present.whiteTurn;
    sendNewTablePosition(tablePosition, changeTurn);
  };

  return (
    <Fragment>
      {tablePosition.length === 0 ? (
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
const mapStateToProps = (state) => ({
  checkerBoard: state.checkerBoard.present.tablePosition,
});
export default connect(mapStateToProps)(Main);
