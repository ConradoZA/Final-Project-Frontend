import store from "../store";
import axios from "axios";
import { API_URL_1 } from "../../api-config";

const state = store.getState();
var user = state.user.user;

export const waitForAproval = async (playerTwo) => {
	const payload = { playerOne: user.name, playerTwo };
	const res = await axios.post(API_URL_1 + "checkers/games/invitation", payload);
	console.log(res.data);
	// 	store.dispatch({
	// 		type: 'NEW_INVITATION',
	// 		payload: res.data
	//   })
	return res;
};
export const getAllGames = async () => {
	const res = await axios.get(API_URL_1 + `checkers/games/getAll=${user.name}`);
	store.dispatch({
		type: "ALL_GAMES",
		payload: res.data,
	});
	return res;
};
export const setGame = async (game) => {
	console.log(game);
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
};
