import React from "react";
import { API_URL_IMAGES } from "../../api-config";

const Home = () => {
	return (
		<main className='flex-column center'>
			<h1>El portal de juegos de mesa para 2 jugadores</h1>
			<h2>¿Te apetece jugar con gente de nuestra comunidad?</h2>
			<h3>¡Conéctate ya!</h3>
			<img
				className='img-home'
				src={API_URL_IMAGES + "board-games-for-couples-1.jpg"}></img>
			<img className='img-home' src={API_URL_IMAGES + "als_ich_kan.jpg"}></img>
		</main>
	);
};

export default Home;
