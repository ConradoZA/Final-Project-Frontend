import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
	AppBar,
	Toolbar,
	IconButton,
	Menu,
	MenuItem,
	Link,
	Button,
	Grow,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CasinoIcon from "@material-ui/icons/Casino";
import EmojiEventsRoundedIcon from "@material-ui/icons/EmojiEventsRounded";
import { logout } from "../Redux/actions/users";
import { API_URL_IMAGES } from "../api-config";

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}));

const Header = ({ user }) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};
	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};
	const handleLogoutMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
		logout().finally(() => window.location.assign("/"));
	};
	const handleLogoutMenuClose = () => {
		setAnchorEl(null);
		logout().finally(() => window.location.assign("/"));
	};

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id='menu'
			keepMounted
			transformOrigin={{ vertical: -55, horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
			TransitionComponent={Grow}>
			<Link href='/profile' style={{ all: "unset" }}>
				<MenuItem>Perfil</MenuItem>
			</Link>
			<Link href='/myGames' style={{ all: "unset" }}>
				<MenuItem>Mis partidas</MenuItem>
			</Link>
			<Link href='/myRecord' style={{ all: "unset" }}>
				<MenuItem>Partidas Terminadas</MenuItem>
			</Link>
		</Menu>
	);

	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id='mobileMenu'
			keepMounted
			transformOrigin={{ vertical: -55, horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
			TransitionComponent={Grow}>
			<MenuItem>
				<Link href='/profile' style={{ color: "black", display: "flex" }}>
					<IconButton color='inherit'>
						<AccountCircle />
					</IconButton>
					<p>Perfil</p>
				</Link>
			</MenuItem>
			<MenuItem>
				<Link href='/myGames' style={{ color: "black", display: "flex" }}>
					<IconButton color='inherit'>
						<CasinoIcon />
					</IconButton>
					<p>Mis Partidas</p>
				</Link>
			</MenuItem>
			<MenuItem>
				<Link href='/myRecord' style={{ color: "black", display: "flex" }}>
					<IconButton color='inherit'>
						<EmojiEventsRoundedIcon />
					</IconButton>
					<p>Partidas Terminadas</p>
				</Link>
			</MenuItem>
			<MenuItem onClick={handleLogoutMobileMenuClose}>
				<IconButton color='inherit'>
					<ExitToAppIcon />
				</IconButton>
				<p>Desconectar</p>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar position='static'>
				<Toolbar>
					<Link href='/'>
						<img
							src={API_URL_IMAGES + "logo.png"}
							alt=''
							style={{ height: "3rem", marginRight: "1rem" }}
						/>
					</Link>
					<Link href='/'>
						<h2 style={{ userSelect: "none", color: "black" }}>Play 2 Games</h2>
					</Link>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						{user ? (
							<div>
								<Button variant='outlined' onClick={handleLogoutMenuClose}>
									Salir
								</Button>

								<IconButton edge='end' onClick={handleProfileMenuOpen} color='inherit'>
									<AccountCircle />
								</IconButton>
							</div>
						) : (
							<></>
						)}
					</div>
					{user ? (
						<div className={classes.sectionMobile}>
							<IconButton onClick={handleMobileMenuOpen} color='inherit'>
								<MoreIcon />
							</IconButton>
						</div>
					) : (
						<Link href='/login'>
							<Button variant='contained' color='secondary'>
								Conectar
							</Button>
						</Link>
					)}
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
};

const mapStateToProps = (state) => ({ user: state.user.user });
export default connect(mapStateToProps)(Header);
