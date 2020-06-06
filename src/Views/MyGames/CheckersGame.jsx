import React, { useEffect } from "react";
import Board from "../../Checkers/Board";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/cjs/HTML5toTouch";
import { unsetGame } from "../../Redux/actions/checkerGames";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

const CheckersGame = (props) => {
	useEffect(() => {
		return () => {
			unsetGame();
		};
	}, [props.checkersPlay]);

	const sendMove = () => {
		console.log(props);
	 };

	return (
		<DndProvider options={HTML5toTouch}>
			<div className='container'>
				<Board />
			</div>
			<Button onClick={sendMove}>Enviar Movimiento</Button>
		</DndProvider>
	);
};

const mapStateToProps = (state) => ({ checkersPlay: state.checkersPlay });
export default connect(mapStateToProps)(CheckersGame);
