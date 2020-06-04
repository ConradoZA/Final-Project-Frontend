import React, { useState } from "react";
import { API_URL_IMAGES } from "../../api-config";
import SnackBar from "../../Components/SnackBar";
import UploadModal from "./Modals/UploadModal";
import HttpModal from "./Modals/HttpModal";
import { connect } from "react-redux";
import {
	Divider,
	Drawer,
	Hidden,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Paper,
	Dialog,
	InputLabel,
	Input,
	InputAdornment,
	Link,
	ListSubheader,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import EditIcon from "@material-ui/icons/Edit";
import CancelScheduleSendIcon from "@material-ui/icons/CancelScheduleSend";
import SendIcon from "@material-ui/icons/Send";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import LockIcon from "@material-ui/icons/Lock";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { updateUser, confirmMail } from "../../Redux/actions/users";
import Password from "./Modals/PasswordModal";
import Delete from "./Modals/DeleteModal";
import profile from "../../assets/imgs/profile.jpg";

const drawerWidth = 190;

const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.up("sm")]: {
			display: "flex",
		},
	},
	drawer: {
		[theme.breakpoints.down("sm")]: {
			width: drawerWidth,
			flexShrink: 0,
			zIndex: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		paddingRight: theme.spacing(3),
		paddingLeft: theme.spacing(1),
		paddingTop: theme.spacing(3),
	},
}));

const Profile = (props) => {
	const user = props.user.user;
	const window = props.window;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [openUpload, setOpenUpload] = useState(false);
	const [openHttp, setOpenHttp] = useState(false);
	const [openPassword, setOpenPassword] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [inputName, setInputName] = useState(true);
	const [inputMail, setInputMail] = useState(true);
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("info");
	const [message, setMessage] = useState("");

	const openSnackBar = () => {
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
			setMessage("");
			setType("info");
		}, 2500);
	};

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const handleUploadModal = () => {
		setOpenUpload(!openUpload);
	};
	const handleHttpModal = () => {
		setOpenHttp(!openHttp);
	};
	const handlePasswordModal = () => {
		setOpenPassword(!openPassword);
	};
	const handleDeleteModal = () => {
		setOpenDelete(!openDelete);
	};

	const handleInputName = () => {
		setInputName(!inputName);
	};

	const handleInputMail = () => {
		setInputMail(!inputMail);
	};
	const handleConfirmMail = () => {
		confirmMail()
			.then((_res) => {
				setMessage("Te hemos enviado un e-mail");
				setType("info");
				openSnackBar();
			})
			.catch((_error) => {
				setMessage("Inténtalo de nuevo");
				setType("error");
				openSnackBar();
			});
	};

	const handleEdit = () => {
		const userProfile = {
			name,
			email,
		};
		updateUser(userProfile)
			.then((_res) => {
				setMessage("Datos Actualizados");
				setType("success");
				openSnackBar();
			})
			.catch((_error) => {
				setMessage("Inténtalo de nuevo");
				setType("error");
				openSnackBar();
			});
		if (!inputName) {
			handleInputName();
		}
		if (!inputMail) {
			handleInputMail();
		}
	};

	const drawer = (
		<div>
			<div className='toolbar' />
			<Divider />
			<List
				subheader={
					<ListSubheader component='div' id='nested-list-subheader'>
						Personalización
					</ListSubheader>
				}>
				<ListItem onClick={handleUploadModal} className='pointer'>
					<ListItemIcon>
						<FileCopyIcon />
					</ListItemIcon>
					<ListItemText primary='Subir imagen' />
				</ListItem>
				<ListItem onClick={handleHttpModal} className='pointer'>
					<ListItemIcon>
						<ImageSearchIcon />
					</ListItemIcon>
					<ListItemText primary='Link a imagen' />
				</ListItem>
			</List>
			<Divider />
			<List subheader={<ListSubheader component='div'>Seguridad</ListSubheader>}>
				<ListItem onClick={handlePasswordModal} className='pointer'>
					<ListItemIcon>
						<LockIcon />
					</ListItemIcon>
					<ListItemText primary='Cambiar contraseña' />
				</ListItem>
				<ListItem onClick={handleDeleteModal} className='pointer'>
					<ListItemIcon>
						<DeleteForeverIcon />
					</ListItemIcon>
					<ListItemText primary='Borrar usuario' />
				</ListItem>
			</List>
		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			{user && (
				<>
					<Toolbar className={classes.appbar}>
						<IconButton
							edge='start'
							onClick={handleDrawerToggle}
							className={classes.menuButton}>
							<MenuIcon />
						</IconButton>
					</Toolbar>
					<nav className={(classes.drawer, "drawer")}>
						<Hidden smUp implementation='css'>
							<Drawer
								container={container}
								variant='temporary'
								anchor={theme.direction === "rtl" ? "right" : "left"}
								open={mobileOpen}
								onClose={handleDrawerToggle}
								classes={{
									paper: classes.drawerPaper,
								}}
								ModalProps={{
									keepMounted: true,
								}}>
								{drawer}
							</Drawer>
						</Hidden>
						<Hidden xsDown implementation='css'>
							<Drawer
								classes={{
									paper: classes.drawerPaper,
								}}
								variant='permanent'
								open>
								{drawer}
							</Drawer>
						</Hidden>
					</nav>
					<main className={classes.content}>
						<Paper className='paper'>
							<div className='flex-center'>
								<img
									src={
										user.image_path.includes("http")
											? user.image_path
											: user.image_path
											? API_URL_IMAGES + user.image_path
											: profile
									}
									alt='user image'
									className='img-profile pointer'
								/>
								<div className='flex-column'>
									<InputLabel>Nombre</InputLabel>
									<Input
										disabled={inputName}
										value={name}
										margin='dense'
										onChange={(event) => {
											setName(event.target.value);
										}}
										startAdornment={
											<InputAdornment>
												<EditIcon onClick={handleInputName} className='pointer' />
											</InputAdornment>
										}
										endAdornment={
											<InputAdornment>
												{inputName ? (
													<CancelScheduleSendIcon className='pointer' />
												) : (
													<SendIcon onClick={handleEdit} className='pointer' />
												)}
											</InputAdornment>
										}
									/>
									<br/>
									<InputLabel>E-mail</InputLabel>
									{user.email_verified ? (
										<Input disabled margin='dense' value={email} />
									) : (
										<Input
											disabled={inputMail}
											margin='dense'
											value={email}
											onChange={(event) => {
												setEmail(event.target.value);
											}}
											startAdornment={
												<InputAdornment>
													<EditIcon onClick={handleInputMail} className='pointer' />
												</InputAdornment>
											}
											endAdornment={
												<InputAdornment>
													{inputMail ? (
														<CancelScheduleSendIcon className='pointer' />
													) : (
														<SendIcon onClick={handleEdit} className='pointer' />
													)}
												</InputAdornment>
											}
										/>
									)}
									{user.email_verified ? (
										""
									) : (
										<Link
											style={{ color: "blue", cursor: "pointer" }}
											onClick={handleConfirmMail}
											variant='body2'>
											Confirmar e-mail
										</Link>
									)}
								</div>
							</div>
						</Paper>
						<Dialog open={openUpload} onClose={handleUploadModal} fullWidth>
							<UploadModal handleUploadModal={handleUploadModal} />
						</Dialog>
						<Dialog open={openHttp} onClose={handleHttpModal} fullWidth>
							<HttpModal image={user.image_path} handleHttpModal={handleHttpModal} />
						</Dialog>
						<Dialog open={openPassword} onClose={handlePasswordModal} fullWidth>
							<Password handlePasswordModal={handlePasswordModal} />
						</Dialog>
						<Dialog open={openDelete} onClose={handleDeleteModal} fullWidth>
							<Delete handleDeleteModal={handleDeleteModal} />
						</Dialog>
						<SnackBar type={type} open={open} message={message} />
					</main>
				</>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({ user: state.user });
export default connect(mapStateToProps)(Profile);
