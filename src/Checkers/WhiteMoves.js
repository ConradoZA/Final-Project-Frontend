import store from '../Redux/store';
const state = store.getState();
const pieces = state.checkerBoard?.present.tablePosition;

var toDelete1 = [];
var toDelete2 = [];
var toDelete3 = [];
var toDelete4 = [];
var option1 = [];
var option2 = [];
var option3 = [];
var option4 = [];
var CAN_CAPTURE = [];

export function whiteMoves(toX, toY, item, actualPiece) {
	const SELF = actualPiece[0];
	const SIDE = SELF[2][0];
	const MX = SELF[0];
	const MY = SELF[1];
	const DX = MX - toX;
	const DY = MY - toY;
	const AX = Math.abs(DX);
	const AY = Math.abs(DY);
	const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	let max = 0;

	if (item.type === "pawn") {
		let CAN_MOVE_1;
		let CAN_MOVE_2;
		CAN_MOVE_1 = (DX === 1 && DY === -1);
		CAN_MOVE_2 = (DX === -1 && DY === -1);
		let OBSTRUCTS = pieces.filter((piece) => (piece[0] === MX - 1 || piece[0] === MX + 1) && piece[1] === MY + 1)
		let PIECES_1 = pieces.filter(p => p[0] === (MX - 2) && p[1] === (MY + 2))
		let PIECES_2 = pieces.filter(p => p[0] === (MX + 2) && p[1] === (MY + 2))
		if (OBSTRUCTS.length > 0) {
			OBSTRUCTS.map(piece2 => {
				if (piece2[1] === MY + 1 && piece2[0] === MX - 1) { CAN_MOVE_1 = false }
				else if (piece2[1] === MY + 1 && piece2[0] === MX + 1) { CAN_MOVE_2 = false }
			})
			CAN_CAPTURE = OBSTRUCTS.filter((piece2) => !piece2[2].includes(SIDE))
		}
		if (CAN_CAPTURE.length > 0) {

			CAN_CAPTURE.map(piece3 => {
				if (PIECES_1.length > 0 && piece3[0] === MX - 1 && piece3[1] === MY + 1) {
					CAN_MOVE_1 = false
				}
				else if (piece3[0] === MX - 1 && piece3[1] === MY + 1) {
					toDelete1 = piece3; option1 = [MX - 2, MY + 2];
					CAN_MOVE_1 = (DX === 2 && DY === -2)
				}
				if (PIECES_2.length > 0 && piece3[0] === MX + 1 && piece3[1] === MY + 1) {
					CAN_MOVE_2 = false
				} else if (piece3[0] === MX + 1 && piece3[1] === MY + 1) {
					toDelete2 = piece3; option2 = [MX + 2, MY + 2];
					CAN_MOVE_2 = (DX === -2 && DY === -2)
				}
			})
		}
		CAN_CAPTURE = []
		return (CAN_MOVE_1 || CAN_MOVE_2)

	} else if (item.type === 'queen') {
		return (
			(NUMBERS.includes(AX) && NUMBERS.includes(AY) && AX === AY)
		)
	}
}

export function whiteResults() {
	return ([toDelete1, toDelete2, toDelete3, toDelete4, option1, option2, option3, option4])
}