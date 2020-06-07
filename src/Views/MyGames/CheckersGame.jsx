import React, { useEffect } from "react";
import Board from "../../Checkers/Board";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/cjs/HTML5toTouch";
import { connect } from "react-redux";
import { getPlay, sendMoveToOponent, acceptDraw } from "../../Redux/actions/checkerPlays";
import { Button } from "@material-ui/core";

const CheckersGame = (props) => {
	let oldMove = [];
	let turn = 0;
	let whitePCaptured = 0;
	let blackPCaptured = 0;
	let captureTimer = 0;
	const present = props.checkersPlay.present;
	const id = props.checkersPlay.id;

	useEffect(() => {
		getPlay(id).then((res) => {
			oldMove = res.data.present;
		});
	}, [present]);

	const doesMove = (arr1, arr2) => {
		const last1 = arr1[arr1.length - 1];
		const last2 = arr2[arr2.length - 1];
		let result = false;
		for (const [index, value] of last1.entries()) {
			if (value !== last2[index]) {
				result = true;
				break;
			}
		}
		return result;
	};
	const doesCapture = (arr1, arr2) => {
		if (arr1.length === arr2.length) {
			return false;
		} else {
			return true;
		}
	};

	const sendMove = () => {
		if (doesMove(present, oldMove)) {
			turn = props.checkersPlay.turn + 1;
			if (doesCapture(present, oldMove)) {
				captureTimer = 0;
			} else {
				captureTimer = props.checkersPlay.captureTimer + 1;
			}
			if (captureTimer !== 25) {
				whitePCaptured = 20 - present.filter((piece) => piece[2].includes("w")).length;
				blackPCaptured = 20 - present.filter((piece) => piece[2].includes("b")).length;
				const newTurn = {
					id,
					turn,
					present,
					whitePCaptured,
					blackPCaptured,
					captureTimer,
				};
				sendMoveToOponent(newTurn)
				.then((_res)=>{

				})
			} else {
				acceptDraw(props.checkersPlay.present.id);
			}
		}
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
