import React from "react";
import { API_URL_IMAGES } from "../../api-config";
import { Paper } from "@material-ui/core";
import { setGame } from "../../Redux/actions/checkerGames";

const CheckerSkeleton = ({ game, name }) => {
	const id = game.gamePlay._id;
	const playerOne = game.playerOne;
	const playerTwo = game.playerTwo;
	const initiated = game.initiated;
	const winner = game.winner;
	const drawOffered = game.drawOffered;
	const turn = game.gamePlay.turn;

	const checkTurn = () => {
		if (
			(turn % 2 === 0 && playerTwo === name) ||
			(turn % 2 === 1 && playerOne === name)
		) {
			return true;
		} else {
			return false;
		}
	};
	const goToGame = () => {
		if (checkTurn) {
			setGame(game);
		}
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
						<strong>Turno:</strong> {turn}
					</p>
					<p>
						<strong>Turno de:</strong> {turn % 2 === 0 ? "Negras" : "Blancas"}
					</p>
					{!initiated && playerTwo === name ? (
						<h4 style={{ color: "darkred" }}>¿Quieres jugar?</h4>
					) : initiated ? (
						<></>
					) : (
						<h4>Invitación enviada</h4>
					)}
					{checkTurn ? (
						<h3 style={{ color: "darkred" }}>Te toca</h3>
					) : (
						<h3>Esperando respuesta</h3>
					)}
				</div>
			</div>
		</Paper>
	);
};

export default CheckerSkeleton;
