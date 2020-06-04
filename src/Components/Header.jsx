import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Link,
  Button,
  Grow,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CasinoIcon from "@material-ui/icons/Casino";
import logo from "../assets/imgs/logo.png";
import { logout } from "../Redux/actions/users";

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
  const [optionsAnchorEl, setOptionsAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isOptionsOpen = Boolean(optionsAnchorEl);

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
  const handleOptionsClose = () => {
    setOptionsAnchorEl(null);
  };
  const handleOptionsMenuOpen = (event) => {
    setOptionsAnchorEl(event.currentTarget);
  };

  const renderOptions = (
    <Menu
      anchorEl={optionsAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      id='menu'
      keepMounted
      transformOrigin={{ vertical: -55, horizontal: "left" }}
      open={isOptionsOpen}
      onClose={handleOptionsClose}
      TransitionComponent={Grow}>
      <ExpansionPanel square style={{ boxShadow: "none" }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Damas</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Link href='/checkers/rules' style={{ all: "unset" }}>
            <MenuItem>Reglas</MenuItem>
          </Link>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Divider />
      <ExpansionPanel square style={{ boxShadow: "none" }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Awale</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Link href='#' style={{ all: "unset" }}>
            <MenuItem>Reglas</MenuItem>
          </Link>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Menu>
  );
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
      {/* ToDo: hacer componente y poner link */}
      <Link href='#' style={{ all: "unset" }}>
        <MenuItem>
          <Badge
            variant='dot'
            color='error'
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}>
            Mis partidas
          </Badge>
        </MenuItem>
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
      //ToDo: Poner el componente
      <MenuItem>
        <Link href='#' style={{ color: "black", display: "flex" }}>
          <IconButton color='inherit'>
            <Badge badgeContent={1} color='error'>
              <CasinoIcon />
            </Badge>
          </IconButton>
          <p>Mis Partidas</p>
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
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            onClick={handleOptionsMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Link href='/'>
            <img src={logo} alt='' style={{ height: "3rem", marginRight: "1rem" }} />
          </Link>
          <Typography
            className={classes.title}
            variant='h6'
            noWrap
            style={{ userSelect: "none" }}>
            Play 2 Games
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {user ? (
              <div>
                <Button variant='outlined' onClick={handleLogoutMenuClose}>
                  Salir
                </Button>

                <IconButton
                  edge='end'
                  onClick={handleProfileMenuOpen}
                  color='inherit'>
                  <Badge badgeContent={1} color='error'>
                    <AccountCircle />
                  </Badge>
                </IconButton>
              </div>
            ) : (
              <></>
            )}
          </div>
          {user ? (
            <div className={classes.sectionMobile}>
              <IconButton onClick={handleMobileMenuOpen} color='inherit'>
                <Badge badgeContent={1} color='error'>
                  <MoreIcon />
                </Badge>
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
      {renderOptions}
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user.user });
export default connect(mapStateToProps)(Header);
