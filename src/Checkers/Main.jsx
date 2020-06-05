import React, { useState, Fragment, useRef } from "react";
import { connect } from "react-redux";
import Board from "./Board";
import "./checkers.css";
// import UndoRedo from "../Components/UndoRedo.jsx";

const Main = () => {
  const [start, setStart] = useState(false);
  const sendMoveRef = useRef();

  const createNewGame = () => {
    setStart(true);
    setTimeout(() => {
      setStart(false);
    }, 100);
  };

  const sendMove = () => {
    sendMoveRef.current.sendMove()
  };

  return (
    <Fragment>
        <button onClick={createNewGame}>Iniciar Partida</button>
      <div className='container'>
        <Board start={start} ref={sendMoveRef} />
        {/* <UndoRedo /> */}
      </div>
      <button onClick={sendMove}>Enviar Movimiento</button>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({ checkerBoardLocal: state.checkerBoardLocal });
export default connect(mapStateToProps)(Main);
