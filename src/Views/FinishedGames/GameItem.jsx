import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneGame } from "../../Redux/actions/checkerGames";

const GameItem = () => {
	let { slug } = useParams();
	let game = {};
	let play = [];
	useEffect(() => {
		getOneGame(slug).then((res) => {
			game = res.data;
			play = res.data.gamePlay;
		});
	}, []);
	return <div></div>;
};

export default GameItem;
