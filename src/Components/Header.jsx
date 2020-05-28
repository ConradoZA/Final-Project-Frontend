import React from "react";
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
import SmsIcon from "@material-ui/icons/Sms";
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

const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [optionsAnchorEl, setOptionsAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isOptionsOpen = Boolean(optionsAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleLogoutMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    logout().finally(() => window.location.assign("/"));
  };
  const handleLogoutMenuClose = () => {
    setAnchorEl(null);
    logout().finally(() => window.location.assign("/"));
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleOptionsClose = () => {
    setOptionsAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleOptionsMenuOpen = (event) => {
    setOptionsAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderOptions = (
    <Menu
      anchorEl={optionsAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      id={menuId}
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
          {props.user ? (
            <Link href='/checkers' style={{ all: "unset" }}>
              <MenuItem style={{ fontWeight: "bold" }}>Jugar</MenuItem>
            </Link>
          ) : (
            <></>
          )}
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
          {/* ToDo: poner el link adecuado */}
          {props.user ? (
            <Link href='#' style={{ all: "unset" }}>
              <MenuItem style={{ fontWeight: "bold" }}>Jugar</MenuItem>
            </Link>
          ) : (
            <></>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Menu>
  );
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: -55, horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      TransitionComponent={Grow}>
      <Link href='/profile' style={{ all: "unset" }}>
        <MenuItem>Perfil</MenuItem>
      </Link>
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

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: -55, horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      TransitionComponent={Grow}>
      <MenuItem>
        <IconButton color='inherit'>
          <Badge badgeContent={4} color='error'>
            <SmsIcon />
          </Badge>
        </IconButton>
        <p>Chat</p>
      </MenuItem>
      <MenuItem>
        <Link href='/profile' style={{ color: "black", display: "flex" }}>
          <IconButton color='inherit'>
            <AccountCircle />
          </IconButton>
          <p>Perfil</p>
        </Link>
      </MenuItem>
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
          <div className={classes.sectionDesktop}>
            {props.user ? (
              <IconButton edge='end' color='inherit'>
                <Badge badgeContent={4} color='error'>
                  <SmsIcon />
                </Badge>
              </IconButton>
            ) : (
              <></>
            )}
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {props.user ? (
              <div>
                <Button variant='outlined' onClick={handleLogoutMenuClose}>
                  Salir
                </Button>

                <IconButton
                  edge='end'
                  aria-controls={menuId}
                  aria-haspopup='true'
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
          {props.user ? (
            <div className={classes.sectionMobile}>
              <IconButton
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'>
                <Badge badgeContent={5} color='error'>
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
