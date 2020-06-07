import React from "react";
import { connect } from "react-redux";
import BoardSquare from "./BoardSquare.jsx";
import WPawn from "./WPawn";
import WQueen from "./WQueen";
import BPawn from "./BPawn";
import BQueen from "./BQueen";
import "./checkers.css";

const Board = (props) => {
	let tablePosition = props.checkersPlay;
	const SQUARES = [];

	const renderIfThereIsPiece = (x, y) => {
		var newArray = tablePosition.map((piece) => {
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
				{renderIfThereIsPiece(X, Y)}
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

	return <div className='board'>{createBoard()}</div>;
};

const mapStateToProps = (state) => ({
	checkersPlay: state.checkersPlay.present,
});
export default connect(mapStateToProps)(Board);
