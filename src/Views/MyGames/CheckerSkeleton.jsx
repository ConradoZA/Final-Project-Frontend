import React, { useState } from "react";
import { API_URL_IMAGES } from "../../api-config";
import { Paper, Dialog } from "@material-ui/core";
import { setGame } from "../../Redux/actions/checkerGames";
import AcceptInvitation from "./AcceptInvitation";
import AcceptDraw from "./AcceptDraw";

const CheckerSkeleton = ({ game, name }) => {
	const checkTurnNumber = () => {
		if (game.gamePlay) {
			return game.gamePlay.turn;
		} else {
			return 0;
		}
	};
	const gameId = game._id;
	const playerOne = game.playerOne;
	const playerTwo = game.playerTwo;
	const initiated = game.initiated;
	const winner = game.winner;
	const drawOffered = game.drawOffered;
	const turn = checkTurnNumber();
	const [openAcceptTicket, setOpenAcceptTicket] = useState(false);
	const [openDrawTicket, setOpenDrawTicket] = useState(false);

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

	const handleAcceptInvitation = () => {
		setOpenAcceptTicket(!openAcceptTicket);
	};
	const handleDrawInvitation = () => {
		setOpenDrawTicket(!openDrawTicket);
	};

	const goToGame = () => {
		if (checkTurn() && initiated) {
			setGame(game);
		} else if (!initiated && playerTwo === name) {
			handleAcceptInvitation();
		} else if (drawOffered) {
			handleDrawInvitation();
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
					{checkTurn() && initiated ? (
						<h3 style={{ color: "red" }}>Te toca</h3>
					) : (
						<h3>Esperando respuesta</h3>
					)}
				</div>
			</div>
			<Dialog open={openAcceptTicket} onClose={handleAcceptInvitation} fullWidth>
				<AcceptInvitation
					id={gameId}
					playerOne={playerOne}
					handleAcceptInvitation={handleAcceptInvitation}
				/>
			</Dialog>
			<Dialog open={openDrawTicket} onClose={handleDrawInvitation} fullWidth>
				<AcceptDraw
					id={gameId}
					playerOne={playerOne}
					handleAcceptInvitation={handleDrawInvitation}
				/>
			</Dialog>
		</Paper>
	);
};

export default CheckerSkeleton;
