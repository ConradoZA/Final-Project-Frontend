import React from "react";
import { useEffect } from "react";
import { getAllGames } from "../../Redux/actions/checkerGames";
import CheckerSkeleton from "./CheckerSkeleton";
import { connect } from "react-redux";
import store from "../../Redux/store";

const AllGames = (props) => {
	const state = store.getState();
	const username = state.user.user.name;
	const stillPlaying = props.allCheckersGame.filter((game) => game.winner === "");
	useEffect(() => {
		getAllGames();
	}, []);

	return (
		<>
			{stillPlaying.map((game) => {
				return <CheckerSkeleton game={game} name={username} key={game._id} />;
			})}
		</>
	);
};
const mapStateToProps = (state) => ({ allCheckersGame: state.allCheckersGame.all });
export default connect(mapStateToProps)(AllGames);
