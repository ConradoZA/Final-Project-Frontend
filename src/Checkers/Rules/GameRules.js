import store from "../../Redux/store";
import { whitePawnMove, whitePawnResults, whiteQueenMove } from "./WhiteMoves";
import { blackPawnMove, blackPawnResults, backQueenMove } from "./BlackMoves";

export function checkTurn() {
	const state = store.getState();
	const turn = state.checkersPlay.turn;
	const moved = state.checkersPlay.moved;
	if (turn % 2 === 1 && moved === false) {
		return "w";
	} else if (turn % 2 === 0 && moved === false) {
		return "b";
	} else {
		return "no";
	}
}

export function canMove(toX, toY, item) {
	const state = store.getState();
	const pieces = state.checkersPlay.present;
	const actualPiece = pieces.find((piece) => item.id === piece[3]);
	const SIDE = actualPiece[2];
	if (SIDE.includes("b")) {
		if (SIDE.includes("p")) {
			return blackPawnMove(toX, toY, actualPiece);
		} else {
			return backQueenMove(toX, toY, actualPiece);
		}
	} else if (SIDE.includes("w")) {
		if (SIDE.includes("p")) {
			return whitePawnMove(toX, toY, actualPiece);
		} else {
			return whiteQueenMove(toX, toY, actualPiece);
		}
	}
}
export function move(toX, toY, item) {
	const state = store.getState();
	const pieces = state.checkersPlay.present;
	const actualPiece = pieces.find((piece) => item.id === piece[3]);
	const newPiecePosition = [toX, toY, actualPiece[2], actualPiece[3]];
	const newBoard = pieces.filter((piece) => actualPiece[3] !== piece[3]);
	if (actualPiece[2] === "bp") {
		blackPawnResults(newPiecePosition);
	} else if (actualPiece[2] === "wp") {
		whitePawnResults(newPiecePosition);
	} else if (actualPiece[2] === "bq") {
	} else if (actualPiece[2] === "wq") {
	}
}
