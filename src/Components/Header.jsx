import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
	AppBar,
	Toolbar,
	IconButton,
	Menu,
	MenuItem,
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
import { Link, useHistory } from "react-router-dom";

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
	const history = useHistory();
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
		logout().finally(() => history.push("/"));
	};
	const handleLogoutMenuClose = () => {
		setAnchorEl(null);
		logout().finally(() => history.push("/"));
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
			<Link to='/profile' className='unset' onClick={handleMenuClose}>
				<MenuItem>Perfil</MenuItem>
			</Link>
			<Link to='/myGames' className='unset' onClick={handleMenuClose}>
				<MenuItem>Mis partidas</MenuItem>
			</Link>
			<Link to='/myRecord' className='unset' onClick={handleMenuClose}>
				<MenuItem>Partidas Terminadas</MenuItem>
			</Link>
			<MenuItem onClick={handleLogoutMenuClose}>Desconectar</MenuItem>
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
			<MenuItem onClick={handleMobileMenuClose}>
				<Link to='/profile' className='mobile-menu'>
					<IconButton color='inherit'>
						<AccountCircle />
					</IconButton>
					<p>Perfil</p>
				</Link>
			</MenuItem>
			<MenuItem onClick={handleMobileMenuClose}>
				<Link to='/myGames' className='mobile-menu'>
					<IconButton color='inherit'>
						<CasinoIcon />
					</IconButton>
					<p>Mis Partidas</p>
				</Link>
			</MenuItem>
			<MenuItem onClick={handleMobileMenuClose}>
				<Link to='/myRecord' className='mobile-menu'>
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
					<Link to='/'>
						<img src={API_URL_IMAGES + "logo.png"} alt='' id='title-img' />
					</Link>
					<Link to='/'>
						<h2 id='title-name'>Play 2 Games</h2>
					</Link>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						{user ? (
							<div>
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
						<Link to='/login'>
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
