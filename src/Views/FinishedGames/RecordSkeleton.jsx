import React from "react";
import { Paper } from "@material-ui/core";
import { API_URL_IMAGES } from "../../api-config";
import { useHistory } from "react-router-dom";

const RecordSkeleton = ({ game, name }) => {
	let history = useHistory();
	const gameId = game._id;
	const playerOne = game.playerOne;
	const playerTwo = game.playerTwo;
	const winner = game.winner;

	const goToGame = () => {
		history.push("/myRecord/" + gameId);
	};

	return (
		<Paper className='paper'>
			<div className='flex pointer' onClick={goToGame}>
				<img
					src={API_URL_IMAGES + "warcaby-polskie.png"}
					alt='checkers'
					className='img-small'
				/>
				<div className='flex-column'>
					<p>
						<strong>Partida entre </strong>
						{playerOne}
						<strong> y </strong>
						{playerTwo}
					</p>
					<p>
						<strong>Resultado:</strong>
					</p>
					{winner === name ? (
						<h4 style={{ color: "gold" }}>GANASTE</h4>
					) : winner === "draw" ? (
						<h4 style={{ color: "blue" }}>EMPATE</h4>
					) : (
						<h4 style={{ color: "darkred" }}>PERDISTE</h4>
					)}
				</div>
			</div>
		</Paper>
	);
};

export default RecordSkeleton;
