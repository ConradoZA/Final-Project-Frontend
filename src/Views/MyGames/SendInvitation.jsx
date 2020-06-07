import React, { useState, useEffect } from "react";
import store from "../../Redux/store";
import {
	Card,
	CardContent,
	CardHeader,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
} from "@material-ui/core";
import { getAllUsers } from "../../Redux/actions/users";
import { waitForAproval } from "../../Redux/actions/checkerGames";
import SnackBar from "../../Components/SnackBar";

const SendInvitation = ({ handleInvitationModal }) => {
	const [user, setUser] = useState("");
	const [users, setUsers] = useState([]);
	const [openSelect, setOpenSelect] = useState(false);
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("info");
	const [message, setMessage] = useState("");
	const state = store.getState();
	var myself = state.user.user.name;

	const openSnackBar = () => {
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
			setMessage("");
			setType("info");
		}, 2500);
	};
	// ToDo: No se actualiza antes de que se monte el componente
	useEffect(() => {
		getAllUsers().then((res) => {
			setUsers(res.data.users);
		});
		console.log(users);
	}, [users]);

	const handleSelect = () => {
		setOpenSelect(!openSelect);
	};
	const handleChange = (event) => {
		setUser(event.target.value);
	};
	const sendTicket = () => {
		waitForAproval(user)
			.then((_res) => {
				setMessage("Invitación enviada. Ahora a esperar");
				setType("success");
				openSnackBar();
				setTimeout(() => {
					handleInvitationModal();
				}, 2500);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<Card>
			<CardHeader title='Busca un oponente' />
			<CardContent className='space-between'>
				<FormControl>
					<InputLabel>Usuarios</InputLabel>
					<Select
						variant='outlined'
						open={open}
						onClose={handleSelect}
						onOpen={handleSelect}
						value={user}
						onChange={handleChange}
						style={{ minWidth: "10rem" }}>
						<MenuItem value='' key={"none"}>
							<em>Nadie</em>
						</MenuItem>
						{users.map((user) => {
							if (user.name !== myself) {
								return (
									<MenuItem key={user.name} value={user.name}>
										{user.name}
									</MenuItem>
								);
							}
						})}
					</Select>
				</FormControl>
				<Button variant='contained' color='primary' onClick={sendTicket}>
					Enviar Invitación
				</Button>
			</CardContent>
			<SnackBar type={type} open={open} message={message} />
		</Card>
	);
};

export default SendInvitation;
