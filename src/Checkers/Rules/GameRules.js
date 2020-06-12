import store from "../../Redux/store";
import { whitePawnMove, whitePawnResults, whitePawnCanCapture } from "./WhitePawnMoves";
import { blackPawnMove, blackPawnResults, blackPawnCanCapture } from "./BlackPawnMoves";
import { queenMove, queenResults, queenCanCapture } from "./QueenMoves";
import { endGame, acceptDraw } from "../../Redux/actions/checkerGames";

export function winningCondition() {
	const state = store.getState();
	const playerOne = state.checkersGame.playerOne;
	const playerTwo = state.checkersGame.playerTwo;
	const gameId = state.checkersGame.id;
	const captureTimer = state.checkersGame.captureTimer;
	const whiteSide = state.checkersPlay.present.filter((piece) => piece[2].includes("w"));
	const whitePawns = state.checkersPlay.present.filter((piece) =>
		piece[2].includes("wp")
	);
	const blackSide = state.checkersPlay.present.filter((piece) => piece[2].includes("b"));
	const blackPawns = state.checkersPlay.present.filter((piece) =>
		piece[2].includes("bp")
	);
	if (whiteSide.length === 0) {
		endGame(gameId, playerTwo);
	} else if (blackSide.length === 0) {
		endGame(gameId, playerOne);
	} else if (whiteSide.length > 2 && whitePawns.length <= 2) {
		endGame(gameId, playerTwo);
	} else if (blackSide.length > 2 && blackPawns.length <= 2) {
		endGame(gameId, playerOne);
	}
	if (captureTimer >= 25) {
		acceptDraw(gameId);
	}
}

export function checkTurn(id) {
	var iCan = [];
	var iCanToo = [];
	const state = store.getState();
	const present = state.checkersPlay.present;
	const turn = state.checkersPlay.turn;
	const moved = state.checkersPlay.moved;
	if (turn % 2 === 1 && moved === false) {
		const allCaptures = [];
		const me = present.find((piece) => piece[3] === id);
		const ownSide = present.filter((piece) => piece[2].includes("w"));
		ownSide.map((piece) => allCaptures.push(whitePawnCanCapture(piece)));
		if (allCaptures.flat().length > 0) {
			if (me[2].includes("p")) {
				iCan = whitePawnCanCapture(me);
			} else if (me[2].includes("q")) {
				iCanToo = queenCanCapture(me);
			}
			if (iCan.length > 0 || iCanToo.length > 0) {
				return "w";
			} else {
				return "no";
			}
		}
		return "w";
	} else if (turn % 2 === 0 && moved === false) {
		const allCaptures = [];
		const me = present.find((piece) => piece[3] === id);
		const ownSide = present.filter((piece) => piece[2].includes("b"));
		ownSide.map((piece) => allCaptures.push(blackPawnCanCapture(piece)));
		if (allCaptures.flat().length > 0) {
			if (me[2].includes("p")) {
				iCan = blackPawnCanCapture(me);
			} else if (me[2].includes("q")) {
				iCanToo = queenCanCapture(me);
			}
			if (iCan.length > 0 || iCanToo.length > 0) {
				return "b";
			} else {
				return "no";
			}
		}
		return "b";
	} else {
		return "no";
	}
}

export function doesCapture(arr1, arr2) {
	if (arr1.length === arr2.length) {
		return false;
	} else {
		return true;
	}
}

export function crownPawn(tablePosition) {
	tablePosition.map((piece) => {
		if (piece[2] === "wp" && piece[1] === 9) {
			piece[2] = "wq";
		}
		if (piece[2] === "bp" && piece[1] === 0) {
			piece[2] = "bq";
		}
	});
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
			return queenMove(toX, toY, actualPiece);
		}
	} else if (SIDE.includes("w")) {
		if (SIDE.includes("p")) {
			return whitePawnMove(toX, toY, actualPiece);
		} else {
			return queenMove(toX, toY, actualPiece);
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
	} else if (actualPiece[2].includes("q")) {
		queenResults(newPiecePosition);
	}
}
