import React, { useState, useEffect } from "react";
import { getAllGames } from "../../Redux/actions/checkerGames";
import CheckerSkeleton from "./CheckerSkeleton";
import { connect } from "react-redux";
import { API_URL_IMAGES } from "../../api-config";
import useSpinner from "../../Components/Spinner/useSpinner";

const AllGames = ({ allCheckersGame, user }) => {
	const [spinner, showSpinner, hideSpinner] = useSpinner();
	const [loading, setLoading] = useState(true);
	const username = user.name;
	const stillPlaying = allCheckersGame.filter((game) => game.winner === "");
	useEffect(() => {
		setLoading(true);
		getAllGames().finally(hideSpinner(), setLoading(false));
	}, []);
	return (
		<div className='flex-column center'>
			{spinner}
			{!loading && stillPlaying.length === 0 && (
				<img src={API_URL_IMAGES + "images/no_game.png"} alt='' className='img-home' />
			)}
			{!loading &&
				stillPlaying.map((game) => {
					return <CheckerSkeleton game={game} name={username} key={game._id} />;
				})}
		</div>
	);
};
const mapStateToProps = (state) => ({
	allCheckersGame: state.allCheckersGame.all,
	user: state.user.user,
});
export default connect(mapStateToProps)(AllGames);
