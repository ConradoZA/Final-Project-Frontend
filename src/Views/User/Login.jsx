import React, { useState } from "react";
import SnackBar from "../../Components/SnackBar";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { login, sendRecoverEmail } from "../../Redux/actions/users";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [sendMail, setSendMail] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("info");
  const [message, setMessage] = useState("");

  const handleSendMail = () => {
    setSendMail(!sendMail);
  };

  const openSnackBar = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setMessage("");
      setType("info");
    }, 2500);
  };

  const handleSendMailPassword = (event) => {
    event.preventDefault();
    sendRecoverEmail(email)
      .then((res) => {
        if (!res) {
          setMessage("No existe ese usuario");
          setType("error");
        } else {
          setMessage("Revisa tu cuenta de correo");
          setType("success");
        }
        openSnackBar();
        setTimeout(() => {
          handleSendMail();
        }, 2500);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    login(user)
      .then(() => {
        setMessage("¡Bienvenido! ¿Preparad@ para jugar?");
        setType("success");
        openSnackBar();
        setTimeout(() => {
          props.history.push("/");
        }, 2500);
      })
      .catch(() => {
        setMessage("Usuario o contraseña incorrectas");
        setType("error");
        openSnackBar();
      });
  };

  useEffect(() => {
    return () => {
      clearTimeout(handleSubmit);
    };
  }, []);

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Conéctate
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Dirección de e-mail'
            name='email'
            type='email'
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Contraseña'
            type='password'
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                style={{ color: "blue", cursor: "pointer" }}
                onClick={handleSendMail}
                variant='body2'>
                ¿Te olvidaste la contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link style={{ color: "blue" }} href='/register' variant='body2'>
                ¡Regístrate!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Dialog open={sendMail} onClose={handleSendMail} fullWidth>
        <DialogTitle>¿No recuerdas tu contraseña?</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSendMailPassword}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <p>
              Por favor, escribe el mail asociado a tu usuario.
              <br />
              Te enviaremos un correo con un enlace para que puedas crear una nueva contraseña.
            </p>
            <br />
            <TextField
              variant='outlined'
              name='email'
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
              required
              label='Tu dirección de e-mail'
            />
            <br />
            <Button type='submit' variant='contained' color='primary'>
              Enviar correo
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <SnackBar type={type} open={open} message={message} />
    </Container>
  );
};

export default Login;
