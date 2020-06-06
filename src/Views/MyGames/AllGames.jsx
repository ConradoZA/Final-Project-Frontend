import React from "react";
import { useEffect } from "react";
import { getAllGames } from "../../Redux/actions/checkerGames";
import CheckerSkeleton from "./CheckerSkeleton";
import { connect } from "react-redux";
import store from "../../Redux/store";

const AllGames = (props) => {
	const state = store.getState();
	const username = state.user.user.name;
	useEffect(() => {
		getAllGames()
			.then((_res) => {
				console.log(_res.data);
			})
			.catch();
	}, []);

	return (
		<>
			{props.allCheckersGame.map((game) => {
				return <CheckerSkeleton game={game} name={username} />;
			})}
		</>
	);
};
const mapStateToProps = (state) => ({ allCheckersGame: state.allCheckersGame.all });
export default connect(mapStateToProps)(AllGames);
