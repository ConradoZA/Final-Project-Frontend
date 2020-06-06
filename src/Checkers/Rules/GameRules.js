import store from "../../Redux/store";
import { printNewTablePosition } from "../../Redux/actions/checkerBoardLocales";
import { whiteMoves, whiteResults } from "./WhiteMoves";
import { blackMoves, blackResults } from "./BlackMoves";
const state = store.getState();
const pieces = state.checkerBoardLocal?.tablePosition;

let actualPiece = [];
let letra = "";
let SIDE = "";
let R = [];

const checkWhoseTurnItIs = () => {
	if (state.checkerBoardLocal.present.whiteTurn && letra === "") {
		letra = "w";
	} else if (!state.checkerBoardLocal.present.whiteTurn && letra === "") {
		letra = "b";
	}
};
export function checkTurn() {
	checkWhoseTurnItIs();
	return letra;
}

export function canMove(toX, toY, item) {
	actualPiece = pieces.filter((piece) => item.id === piece[3]);
	SIDE = actualPiece[0][2];
	if (SIDE.includes(letra)) {
		if (SIDE.includes("b")) {
			return blackMoves(toX, toY, item, actualPiece);
		} else if (SIDE.includes("w")) {
			return whiteMoves(toX, toY, item, actualPiece);
		}
	}
}
export function move(toX, toY) {
	R = [];
	const newPiecePosition = [toX, toY, actualPiece[0][2], actualPiece[0][3]];
	let newBoard = pieces.filter((piece) => actualPiece[0][3] !== piece[3]);
	if (SIDE.includes("b")) {
		R = blackResults();
	} else if (SIDE.includes("w")) {
		R = whiteResults();
	}
	let toDelete1 = R[0];
	let toDelete2 = R[1];
	let toDelete3 = R[2];
	let toDelete4 = R[3];
	let option1 = R[4];
	let option2 = R[5];
	let option3 = R[6];
	let option4 = R[7];
	if (toDelete1.length > 0 && option1[0] === toX && option1[1] === toY) {
		newBoard = newBoard.filter((piece) => toDelete1[3] !== piece[3]);
	} else if (toDelete2.length > 0 && option2[0] === toX && option2[1] === toY) {
		newBoard = newBoard.filter((piece) => toDelete2[3] !== piece[3]);
	} else if (toDelete3.length > 0 && option3[0] === toX && option3[1] === toY) {
		newBoard = newBoard.filter((piece) => toDelete3[3] !== piece[3]);
	} else if (toDelete4.length > 0 && option4[0] === toX && option4[1] === toY) {
		newBoard = newBoard.filter((piece) => toDelete4[3] !== piece[3]);
	}

	newBoard.push(newPiecePosition);
	printNewTablePosition(newBoard);
}
