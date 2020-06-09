import store from "../../Redux/store";
import {
	whitePawnMove,
	whitePawnResults,
	whiteQueenMove,
	whitePawnCanCapture,
} from "./WhiteMoves";
import {
	blackPawnMove,
	blackPawnResults,
	backQueenMove,
	blackPawnCanCapture,
} from "./BlackMoves";

export function checkTurn(id) {
	const state = store.getState();
	const turn = state.checkersPlay.turn;
	const moved = state.checkersPlay.moved;
	if (turn % 2 === 1 && moved === false) {
		const allCaptures = [];
		const me = state.checkersPlay.present.find((piece) => piece[3] === id);
		const ownSide = state.checkersPlay.present.filter((piece) => piece[2].includes("w"));
		ownSide.map((piece) => allCaptures.push(whitePawnCanCapture(piece)));
		if (allCaptures.flat().length > 0) {
			const iCan = whitePawnCanCapture(me);
			if (iCan.length > 0) {
				return "w";
			} else {
				return "no";
			}
		}
	} else if (turn % 2 === 0 && moved === false) {
		const allCaptures = [];
		const me = state.checkersPlay.present.find((piece) => piece[3] === id);
		const ownSide = state.checkersPlay.present.filter((piece) => piece[2].includes("w"));
		ownSide.map((piece) => allCaptures.push(whitePawnCanCapture(piece)));
		if (allCaptures.flat().length > 0) {
			const iCan = whitePawnCanCapture(me);
			if (iCan.length > 0) {
				return "b";
			} else {
				return "no";
			}
		}
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
	if (actualPiece[2] === "bp") {
		blackPawnResults(newPiecePosition);
	} else if (actualPiece[2] === "wp") {
		whitePawnResults(newPiecePosition);
	} else if (actualPiece[2] === "bq") {
	} else if (actualPiece[2] === "wq") {
	}
}
