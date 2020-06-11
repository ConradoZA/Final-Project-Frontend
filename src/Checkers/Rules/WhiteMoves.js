import store from "../../Redux/store";
import { setNewMove } from "../../Redux/actions/checkerPlays";
import { crownPawn } from "./GameRules";

var PAWN_CAN_MOVE_1 = false;
var PAWN_CAN_MOVE_2 = false;
var QUEEN_CAN_MOVE_1 = false;
var QUEEN_CAN_MOVE_2 = false;
var QUEEN_CAN_MOVE_3 = false;
var QUEEN_CAN_MOVE_4 = false;
var POSIBLE_CAPTURE_1 = [];
var POSIBLE_CAPTURE_2 = [];
var POSIBLE_CAPTURE_3 = [];
var POSIBLE_CAPTURE_4 = [];

export function whitePawnCanCapture(actualPiece) {
	const state = store.getState();
	const pieces = state.checkersPlay.present;
	const SIDE = actualPiece[2][0];
	const MX = actualPiece[0];
	const MY = actualPiece[1];
	const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const OBSTRUCTS = pieces.filter(
		(piece) => (piece[0] === MX - 1 || piece[0] === MX + 1) && piece[1] === MY + 1
	);
	const POSIBLE_CAPTURES = OBSTRUCTS.filter((piece) => !piece[2].includes(SIDE));
	const PIECES_TO_CAPTURE = [];

	POSIBLE_CAPTURE_1 = POSIBLE_CAPTURES.filter(
		(p) =>
			p[0] - 1 === MX - 2 &&
			p[1] + 1 === MY + 2 &&
			NUMBERS.includes(MX - 2) &&
			NUMBERS.includes(MY + 2)
	).flat();
	POSIBLE_CAPTURE_2 = POSIBLE_CAPTURES.filter(
		(p) =>
			p[0] + 1 === MX + 2 &&
			p[1] + 1 === MY + 2 &&
			NUMBERS.includes(MX + 2) &&
			NUMBERS.includes(MY + 2)
	).flat();

	var EMPTY_CAPTURE_1 = "no";
	var EMPTY_CAPTURE_2 = "no";
	if (POSIBLE_CAPTURE_1.length === 4) {
		EMPTY_CAPTURE_1 = pieces
			.filter((piece) => piece[0] === MX - 2 && piece[1] === MY + 2)
			.flat()
			.toString()
			.replace(/ /g, "");
	}
	if (POSIBLE_CAPTURE_2.length === 4) {
		EMPTY_CAPTURE_2 = pieces
			.filter((piece) => piece[0] === MX + 2 && piece[1] === MY + 2)
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

export function whitePawnMove(toX, toY, actualPiece) {
	const state = store.getState();
	const pieces = state.checkersPlay.present;
	const MX = actualPiece[0];
	const MY = actualPiece[1];
	const DX = MX - toX;
	const DY = MY - toY;
	PAWN_CAN_MOVE_1 = DX === 1 && DY === -1;
	PAWN_CAN_MOVE_2 = DX === -1 && DY === -1;
	const OBSTRUCTS = pieces.filter(
		(piece) => (piece[0] === MX - 1 || piece[0] === MX + 1) && piece[1] === MY + 1
	);
	const captures = whitePawnCanCapture(actualPiece);

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
			if (POSIBLE_CAPTURE_1.length > 0 && piece[0] === MX - 1 && piece[1] === MY + 1) {
				PAWN_CAN_MOVE_1 = false;
			} else if (piece[0] === MX - 1 && piece[1] === MY + 1) {
				PAWN_CAN_MOVE_1 = DX === 2 && DY === -2;
			}
			if (POSIBLE_CAPTURE_2.length > 0 && piece[0] === MX + 1 && piece[1] === MY + 1) {
				PAWN_CAN_MOVE_2 = false;
			} else if (piece[0] === MX + 1 && piece[1] === MY + 1) {
				PAWN_CAN_MOVE_2 = DX === -2 && DY === -2;
			}
		});
	}
	return PAWN_CAN_MOVE_1 || PAWN_CAN_MOVE_2;
}

export function whitePawnResults(newPiecePosition) {
	const state = store.getState();
	var moved = true;
	var newBoard = state.checkersPlay.present.filter(
		(piece) => newPiecePosition[3] !== piece[3]
	);
	if (
		POSIBLE_CAPTURE_1.length > 0 &&
		POSIBLE_CAPTURE_1[0] - 2 === newPiecePosition[0] &&
		POSIBLE_CAPTURE_1[1] + 2 === newPiecePosition[1]
	) {
		newBoard = newBoard.filter((piece) => POSIBLE_CAPTURE_1[3] !== piece[3]);
		const chain = whitePawnCanCapture(newPiecePosition, newBoard);
		if (chain.length > 0) {
			moved = false;
		}
	} else if (
		POSIBLE_CAPTURE_2.length > 0 &&
		POSIBLE_CAPTURE_2[0] + 2 === newPiecePosition[0] &&
		POSIBLE_CAPTURE_2[1] + 2 === newPiecePosition[1]
	) {
		newBoard = newBoard.filter((piece) => POSIBLE_CAPTURE_2[3] !== piece[3]);
		const chain = whitePawnCanCapture(newPiecePosition, newBoard);
		if (chain.length > 0) {
			moved = false;
		}
	}
	newBoard.push(newPiecePosition);
	crownPawn(newBoard);
	setNewMove(newBoard, moved);
}

export function whiteQueenMove(toX, toY, actualPiece) {
	const state = store.getState();
	const pieces = state.checkersPlay.present;
	const SIDE = actualPiece[2][0];
	const MX = actualPiece[0];
	const MY = actualPiece[1];
	const DX = MX - toX;
	const DY = MY - toY;
	const AX = Math.abs(DX);
	const AY = Math.abs(DY);
	const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const QUEEN_MOVE = AX === AY && NUMBERS.includes(AX) && NUMBERS.includes(AY);
	QUEEN_CAN_MOVE_1 = QUEEN_MOVE && MX > toX && MY < toY;
	QUEEN_CAN_MOVE_2 = QUEEN_MOVE && MX < toX && MY < toY;
	QUEEN_CAN_MOVE_3 = QUEEN_MOVE && MX < toX && MY > toY;
	QUEEN_CAN_MOVE_4 = QUEEN_MOVE && MX > toX && MY > toY;

	const OBSTRUCTS = pieces.filter((piece) => {
		const AXp = Math.abs(MX - piece[0]);
		const AYp = Math.abs(MY - piece[1]);
		return AXp === AYp && NUMBERS.includes(AXp) && NUMBERS.includes(AYp);
	});
	const CAN_CAPTURE = whiteQueenCanCapture(actualPiece);
	OBSTRUCTS.map((piece) => {
		if (toX <= piece[0] && toY >= piece[1] && MX > piece[0] && MY < piece[1]) {
			QUEEN_CAN_MOVE_1 = QUEEN_CAN_MOVE_1 && toX > piece[0] && toY < piece[1];
		} else if (toX >= piece[0] && toY >= piece[1] && MX < piece[0] && MY < piece[1]) {
			QUEEN_CAN_MOVE_2 = QUEEN_CAN_MOVE_2 && toX < piece[0] && toY < piece[1];
		} else if (toX >= piece[0] && toY <= piece[1] && MX < piece[0] && MY > piece[1]) {
			QUEEN_CAN_MOVE_3 = QUEEN_CAN_MOVE_3 && toX < piece[0] && toY > piece[1];
		} else if (toX <= piece[0] && toY <= piece[1] && MX > piece[0] && MY > piece[1]) {
			QUEEN_CAN_MOVE_4 = QUEEN_CAN_MOVE_4 && toX > piece[0] && toY > piece[1];
		}
	});
	// const ENEMIES = OBSTRUCTS.filter((piece) => !piece[2].includes(SIDE));
	// const OBSTRUCTS_2 = ENEMIES.find(
	// 	(piece) => piece[3] !== CAN_CAPTURE.forEach((piece) => piece[3])
	// );
	if (POSIBLE_CAPTURE_1.length === 4) {
		QUEEN_CAN_MOVE_1 =
			QUEEN_MOVE &&
			MX > toX &&
			MY < toY &&
			toX !== POSIBLE_CAPTURE_1[0] &&
			toY !== POSIBLE_CAPTURE_1[1] &&
			NUMBERS.includes(POSIBLE_CAPTURE_1[0] - 1) &&
			NUMBERS.includes(POSIBLE_CAPTURE_1[1] + 1);
	}
	if (POSIBLE_CAPTURE_2.length === 4) {
		QUEEN_CAN_MOVE_2 =
			QUEEN_MOVE &&
			MX < toX &&
			MY < toY &&
			toX !== POSIBLE_CAPTURE_2[0] &&
			toY !== POSIBLE_CAPTURE_2[1] &&
			NUMBERS.includes(POSIBLE_CAPTURE_2[0] + 1) &&
			NUMBERS.includes(POSIBLE_CAPTURE_2[1] + 1);
	}
	if (POSIBLE_CAPTURE_3.length === 4) {
		QUEEN_CAN_MOVE_3 =
			QUEEN_MOVE &&
			MX < toX &&
			MY > toY &&
			toX !== POSIBLE_CAPTURE_3[0] &&
			toY !== POSIBLE_CAPTURE_3[1] &&
			NUMBERS.includes(POSIBLE_CAPTURE_3[0] + 1) &&
			NUMBERS.includes(POSIBLE_CAPTURE_3[1] - 1);
	}
	if (POSIBLE_CAPTURE_4.length === 4) {
		QUEEN_CAN_MOVE_4 =
			QUEEN_MOVE &&
			MX > toX &&
			MY > toY &&
			toX !== POSIBLE_CAPTURE_4[0] &&
			toY !== POSIBLE_CAPTURE_4[1] &&
			NUMBERS.includes(POSIBLE_CAPTURE_4[0] - 1) &&
			NUMBERS.includes(POSIBLE_CAPTURE_4[1] - 1);
	}
	// if (OBSTRUCTS_2.length > 0) {
	// 	var a = (OBSTRUCTS_2[0] !== toX && OBSTRUCTS_2[1] !== toY);
	// }
	// console.log(a);
	return QUEEN_CAN_MOVE_1 || QUEEN_CAN_MOVE_2 || QUEEN_CAN_MOVE_3 || QUEEN_CAN_MOVE_4;
}

export function whiteQueenCanCapture(actualPiece) {
	const state = store.getState();
	const pieces = state.checkersPlay?.present;
	const SIDE = actualPiece[2][0];
	const MX = actualPiece[0];
	const MY = actualPiece[1];
	const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const OBSTRUCTS = pieces.filter((piece) => {
		const AXp = Math.abs(MX - piece[0]);
		const AYp = Math.abs(MY - piece[1]);
		return AXp === AYp && NUMBERS.includes(AXp) && NUMBERS.includes(AYp);
	});
	const POSIBLE_CAPTURES = OBSTRUCTS.filter((piece) => !piece[2].includes(SIDE));
	const PIECES_TO_CAPTURE = [];
	POSIBLE_CAPTURE_1 = POSIBLE_CAPTURES.filter((piece) => {
		return MX - piece[0] === (MY - piece[1]) * -1 && MX > piece[0] && MY < piece[1];
	});
	POSIBLE_CAPTURE_2 = POSIBLE_CAPTURES.filter((piece) => {
		return MX - piece[0] === MY - piece[1] && MX < piece[0] && MY < piece[1];
	});
	POSIBLE_CAPTURE_3 = POSIBLE_CAPTURES.filter((piece) => {
		return (MX - piece[0]) * -1 === MY - piece[1] && MX < piece[0] && MY > piece[1];
	});
	POSIBLE_CAPTURE_4 = POSIBLE_CAPTURES.filter((piece) => {
		return MX - piece[0] === MY - piece[1] && MX > piece[0] && MY > piece[1];
	});
	var EMPTY_CAPTURE_1 = "no";
	var EMPTY_CAPTURE_2 = "no";
	var EMPTY_CAPTURE_3 = "no";
	var EMPTY_CAPTURE_4 = "no";

	if (POSIBLE_CAPTURE_1.length > 0) {
		POSIBLE_CAPTURE_1 = POSIBLE_CAPTURE_1[POSIBLE_CAPTURE_1.length - 1];
		EMPTY_CAPTURE_1 = pieces
			.filter(
				(piece) =>
					piece[0] === POSIBLE_CAPTURE_1[0] - 1 && piece[1] === POSIBLE_CAPTURE_1[1] + 1
			)
			.toString();
	}

	if (POSIBLE_CAPTURE_2.length > 0) {
		POSIBLE_CAPTURE_2 = POSIBLE_CAPTURE_2[POSIBLE_CAPTURE_2.length - 1];
		EMPTY_CAPTURE_2 = pieces
			.filter(
				(piece) =>
					piece[0] === POSIBLE_CAPTURE_2[0] + 1 && piece[1] === POSIBLE_CAPTURE_2[1] + 1
			)
			.toString();
	}

	if (POSIBLE_CAPTURE_3.length > 0) {
		POSIBLE_CAPTURE_3 = POSIBLE_CAPTURE_3[POSIBLE_CAPTURE_3.length - 1];
		EMPTY_CAPTURE_3 = pieces
			.filter(
				(piece) =>
					piece[0] === POSIBLE_CAPTURE_3[0] + 1 && piece[1] === POSIBLE_CAPTURE_3[1] - 1
			)
			.toString();
	}

	if (POSIBLE_CAPTURE_4.length > 0) {
		POSIBLE_CAPTURE_4 = POSIBLE_CAPTURE_4[POSIBLE_CAPTURE_4.length - 1];
		EMPTY_CAPTURE_4 = pieces
			.filter(
				(piece) =>
					piece[0] === POSIBLE_CAPTURE_4[0] - 1 && piece[1] === POSIBLE_CAPTURE_4[1] - 1
			)
			.toString();
	}
	if (!!!EMPTY_CAPTURE_1) {
		PIECES_TO_CAPTURE.push(POSIBLE_CAPTURE_1);
	}
	if (!!!EMPTY_CAPTURE_2) {
		PIECES_TO_CAPTURE.push(POSIBLE_CAPTURE_2);
	}
	if (!!!EMPTY_CAPTURE_3) {
		PIECES_TO_CAPTURE.push(POSIBLE_CAPTURE_3);
	}
	if (!!!EMPTY_CAPTURE_4) {
		PIECES_TO_CAPTURE.push(POSIBLE_CAPTURE_4);
	}
	return PIECES_TO_CAPTURE;
}

export function whiteQueenResults(newPiecePosition) {
	const state = store.getState();
	var moved = true;
	var newBoard = state.checkersPlay.present.filter(
		(piece) => newPiecePosition[3] !== piece[3]
	);
	if (
		POSIBLE_CAPTURE_1.length > 0 &&
		newPiecePosition[0] < POSIBLE_CAPTURE_1[0] &&
		newPiecePosition[1] > POSIBLE_CAPTURE_1[1]
	) {
		newBoard = newBoard.filter((piece) => POSIBLE_CAPTURE_1[3] !== piece[3]);
		const chain = whiteQueenCanCapture(newPiecePosition, newBoard);
		if (chain.length > 0) {
			moved = false;
		}
	} else if (
		POSIBLE_CAPTURE_2.length > 0 &&
		newPiecePosition[0] > POSIBLE_CAPTURE_2[0] &&
		newPiecePosition[1] > POSIBLE_CAPTURE_2[1]
	) {
		newBoard = newBoard.filter((piece) => POSIBLE_CAPTURE_2[3] !== piece[3]);
		const chain = whiteQueenCanCapture(newPiecePosition, newBoard);
		if (chain.length > 0) {
			moved = false;
		}
	} else if (
		POSIBLE_CAPTURE_3.length > 0 &&
		newPiecePosition[0] > POSIBLE_CAPTURE_3[0] &&
		newPiecePosition[1] < POSIBLE_CAPTURE_3[1]
	) {
		newBoard = newBoard.filter((piece) => POSIBLE_CAPTURE_3[3] !== piece[3]);
		const chain = whiteQueenCanCapture(newPiecePosition, newBoard);
		if (chain.length > 0) {
			moved = false;
		}
	} else if (
		POSIBLE_CAPTURE_4.length > 0 &&
		newPiecePosition[0] < POSIBLE_CAPTURE_4[0] &&
		newPiecePosition[1] < POSIBLE_CAPTURE_4[1]
	) {
		newBoard = newBoard.filter((piece) => POSIBLE_CAPTURE_4[3] !== piece[3]);
		const chain = whiteQueenCanCapture(newPiecePosition, newBoard);
		if (chain.length > 0) {
			moved = false;
		}
	}

	newBoard.push(newPiecePosition);
	setNewMove(newBoard, moved);
}
