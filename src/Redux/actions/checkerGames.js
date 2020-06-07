import store from "../store";
import axios from "axios";
import { API_URL_1 } from "../../api-config";

const state = store.getState();
var user = state.user.user;

export const waitForAproval = async (playerTwo) => {
	const payload = { playerOne: user.name, playerTwo };
	const res = await axios.post(API_URL_1 + "checkers/games/invitation", payload);
	const invitation = {
		id: res.data.invite._id,
		initiated: res.data.invite.initiated,
		playerOne: res.data.invite.playerOne,
		playerTwo: res.data.invite.playerTwo,
	};
	store.dispatch({
		type: "NEW_INVITATION",
		payload: invitation,
	});
	return res;
};

export const answerInvitation = async (answer, gameId) => {
	await axios.put(API_URL_1 + "checkers/games/answer", {
		answer,
		gameId,
	});
	const updatedGames = getAllGames();
	return updatedGames;
};

export const getAllGames = async () => {
	const res = await axios.get(API_URL_1 + `checkers/games/getAll=${user.name}`);
	store.dispatch({
		type: "ALL_GAMES",
		payload: res.data,
	});
	return res;
};
export const getOneGame = async (gameId) => {
	const res = await axios.get(API_URL_1 + `checkers/games/get=${gameId}`);
	return res;
};
export const setGame = async (game) => {
	store.dispatch({
		type: "SET_GAME",
		id: game._id,
		playerOne: game.playerOne,
		playerTwo: game.playerTwo,
		initiated: game.initiated,
		winner: game.winner,
		drawOffered: game.drawOffered,
	});
	store.dispatch({
		type: "SET_PLAY",
		id:game.gamePlay._id,
		past: game.gamePlay.past,
		present: game.gamePlay.present,
		turn: game.gamePlay.turn,
		whitePCaptured: game.gamePlay.whitePCaptured,
		blackPCaptured: game.gamePlay.blackPCaptured,
		captureTimer: game.gamePlay.captureTimer,
	});
};
export const unsetGame = async (game) => {
	store.dispatch({
		type: "UNSET_GAME",
	});
	store.dispatch({
		type: "UNSET_PLAY",
	});
	return true;
};
