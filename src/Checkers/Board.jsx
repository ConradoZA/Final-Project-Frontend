import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { connect } from "react-redux";
import BoardSquare from "./BoardSquare.jsx";
import WPawn from "./WPawn";
import WQueen from "./WQueen";
import BPawn from "./BPawn";
import BQueen from "./BQueen";
import "./checkers.css";
import { setTablePosition } from "../Redux/actions/checkerBoardLocales.js";
import { sendNewTablePosition } from "../Redux/actions/checkerPlays";

const Board = forwardRef((props, ref) => {
	let tablePosition = props.checkerBoardLocal;
	const SQUARES = [];

	const createNewGamePieces = () => {
		const newGamePieces = [
			[9, 9, "bp", 99],
			[7, 9, "bp", 97],
			[5, 9, "bp", 95],
			[3, 9, "bp", 93],
			[1, 9, "bp", 91],
			[8, 8, "bp", 88],
			[6, 8, "bp", 86],
			[4, 8, "bp", 84],
			[2, 8, "bp", 82],
			[0, 8, "bp", 80],
			[9, 7, "bp", 79],
			[7, 7, "bp", 77],
			[5, 7, "bp", 75],
			[3, 7, "bp", 73],
			[1, 7, "bp", 71],
			[8, 6, "bp", 68],
			[6, 6, "bp", 66],
			[4, 6, "bp", 64],
			[2, 6, "bp", 62],
			[0, 6, "bp", 60],
			[9, 3, "wp", 39],
			[7, 3, "wp", 37],
			[5, 3, "wp", 35],
			[3, 3, "wp", 33],
			[1, 3, "wp", 31],
			[8, 2, "wp", 28],
			[6, 2, "wp", 26],
			[4, 2, "wp", 24],
			[2, 2, "wp", 22],
			[0, 2, "wp", 20],
			[9, 1, "wp", 19],
			[7, 1, "wp", 17],
			[5, 1, "wp", 15],
			[3, 1, "wp", 13],
			[1, 1, "wp", 11],
			[8, 0, "wp", 8],
			[6, 0, "wp", 6],
			[4, 0, "wp", 4],
			[2, 0, "wp", 2],
			[0, 0, "wp", 0],
		];
		setTablePosition(newGamePieces);
	};
	const renderIfThereIsPiece = (i, x, y) => {
		if (props.start) {
			createNewGamePieces();
		}
		let newArray = tablePosition.map((piece) => {
			const id = piece[3];
			if (x === piece[0] && y === piece[1]) {
				switch (piece[2]) {
					case "wp":
						return <WPawn color={"wp"} id={id} key={id} />;
					case "wq":
						return <WQueen color={"wq"} id={id} key={id} />;
					case "bp":
						return <BPawn color={"bp"} id={id} key={id} />;
					case "bq":
						return <BQueen color={"bq"} id={id} key={id} />;
					default:
						return <></>;
				}
			}
		});
		return newArray;
	};
	const addSquare = (i) => {
		let X = i % 10;
		let Y = Math.floor(i / 10);
		return (
			<BoardSquare x={X} y={Y} key={i}>
				{renderIfThereIsPiece(i, X, Y)}
			</BoardSquare>
		);
	};
	const createBoard = () => {
		for (let i = 99; i >= 0; i--) {
			SQUARES.push(addSquare(i));
			if (i === 0) {
				return SQUARES;
			}
		}
	};

	useImperativeHandle(ref, () => ({
		sendMove() {
      console.log(newArray);
			// sendNewTablePosition(newArray);
		},
	}));

	return <div className='board'>{createBoard()}</div>;
});

const mapStateToProps = (state) => ({
	checkerBoardLocal: state.checkerBoardLocal.tablePosition,
});
export default connect(mapStateToProps)(Board);
