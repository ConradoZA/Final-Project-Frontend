import store from "../../Redux/store";
import { setNewMove } from "../../Redux/actions/checkerPlays";

var toDelete1 = [];
var toDelete2 = [];
// var toDelete3 = [];
// var toDelete4 = [];
var option1 = [];
var option2 = [];
// var option3 = [];
// var option4 = [];
var PAWN_CAN_MOVE_1 = false;
var PAWN_CAN_MOVE_2 = false;
var PIECE_TO_CAPTURE_1 = [];
var PIECE_TO_CAPTURE_2 = [];

export function blackPawnCanCapture(actualPiece) {
	const state = store.getState();
	const pieces = state.checkersPlay?.present;
	const SIDE = actualPiece[2][0];
	const MX = actualPiece[0];
	const MY = actualPiece[1];
	const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const OBSTRUCTS = pieces.filter(
		(piece) => (piece[0] === MX - 1 || piece[0] === MX + 1) && piece[1] === MY - 1
	);
	const POSIBLE_CAPTURES = OBSTRUCTS.filter((piece) => !piece[2].includes(SIDE));
	const PIECES_TO_CAPTURE = [];

	const POSIBLE_CAPTURE_1 = POSIBLE_CAPTURES.filter(
		(p) =>
			p[0] - 1 === MX - 2 &&
			p[1] - 1 === MY - 2 &&
			NUMBERS.includes(MX - 2) &&
			NUMBERS.includes(MY - 2)
	).flat();
	const POSIBLE_CAPTURE_2 = POSIBLE_CAPTURES.filter(
		(p) =>
			p[0] + 1 === MX + 2 &&
			p[1] - 1 === MY - 2 &&
			NUMBERS.includes(MX + 2) &&
			NUMBERS.includes(MY - 2)
	).flat();
	var EMPTY_CAPTURE_1 = "no";
	var EMPTY_CAPTURE_2 = "no";
	if (POSIBLE_CAPTURE_1.length === 4) {
		EMPTY_CAPTURE_1 = pieces
			.filter((piece) => piece[0] === MX - 2 && piece[1] === MY - 2)
			.flat()
			.toString()
			.replace(/ /g, "");
	}
	if (POSIBLE_CAPTURE_2.length === 4) {
		EMPTY_CAPTURE_2 = pieces
			.filter((piece) => piece[0] === MX + 2 && piece[1] === MY - 2)
			.flat()
			.toString()
			.replace(/ /g, "");
	}
	if (!!!EMPTY_CAPTURE_1) {
		PIECES_TO_CAPTURE.push(POSIBLE_CAPTURE_1);
	}
	if (!!!EMPTY_CAPTURE_2) {
		PIECES_TO_CAPTURE.push(POSIBLE_CAPTURE_2);
	}
	return PIECES_TO_CAPTURE;
}

export function blackPawnMove(toX, toY, actualPiece) {
	const state = store.getState();
	const pieces = state.checkersPlay.present;
	const MX = actualPiece[0];
	const MY = actualPiece[1];
	const DX = MX - toX;
	const DY = MY - toY;
	PAWN_CAN_MOVE_1 = DX === 1 && DY === 1;
	PAWN_CAN_MOVE_2 = DX === -1 && DY === 1;
	const OBSTRUCTS = pieces.filter(
		(piece) => (piece[0] === MX - 1 || piece[0] === MX + 1) && piece[1] === MY - 1
	);
	const captures = blackPawnCanCapture(actualPiece);

	OBSTRUCTS.map((piece) => {
		if (piece[0] === MX - 1) {
			PAWN_CAN_MOVE_1 = false;
		}
		if (piece[0] === MX + 1) {
			PAWN_CAN_MOVE_2 = false;
		}
	});

	if (captures.length > 0) {
		captures.map((piece) => {
			if (PIECE_TO_CAPTURE_1.length > 0 && piece[0] === MX - 1 && piece[1] === MY - 1) {
				PAWN_CAN_MOVE_1 = false;
			} else if (piece[0] === MX - 1 && piece[1] === MY - 1) {
				toDelete1 = piece;
				option1 = [MX - 2, MY - 2];
				PAWN_CAN_MOVE_1 = DX === 2 && DY === 2;
			}
			if (PIECE_TO_CAPTURE_2.length > 0 && piece[0] === MX + 1 && piece[1] === MY - 1) {
				PAWN_CAN_MOVE_2 = false;
			} else if (piece[0] === MX + 1 && piece[1] === MY - 1) {
				toDelete2 = piece;
				option2 = [MX + 2, MY - 2];
				PAWN_CAN_MOVE_2 = DX === -2 && DY === 2;
			}
		});
	}
	return PAWN_CAN_MOVE_1 || PAWN_CAN_MOVE_2;
}
export function backQueenMove(toX, toY, actualPiece) {
	const MX = actualPiece[0];
	const MY = actualPiece[1];
	const DX = MX - toX;
	const DY = MY - toY;
	const AX = Math.abs(DX);
	const AY = Math.abs(DY);
	const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	return NUMBERS.includes(AX) && NUMBERS.includes(AY) && AX === AY;
}

export function blackPawnResults(newPiecePosition) {
	const state = store.getState();
	var moved = true;
	var newBoard = state.checkersPlay.present.filter(
		(piece) => newPiecePosition[3] !== piece[3]
	);
	if (
		toDelete1.length > 0 &&
		option1[0] === newPiecePosition[0] &&
		option1[1] === newPiecePosition[1]
	) {
		newBoard = newBoard.filter((piece) => toDelete1[3] !== piece[3]);
	} else if (
		toDelete2.length > 0 &&
		option2[0] === newPiecePosition[0] &&
		option2[1] === newPiecePosition[1]
	) {
		newBoard = newBoard.filter((piece) => toDelete2[3] !== piece[3]);
	}
	const chain = blackPawnCanCapture(newPiecePosition, newBoard);
	if (chain.length > 0) {
		moved = false;
	}
	newBoard.push(newPiecePosition);
	setNewMove(newBoard, moved);
}
