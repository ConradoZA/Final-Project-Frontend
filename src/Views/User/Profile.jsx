import React, { useState } from "react";
import { API_URL_IMAGES } from "../../api-config";
import SnackBar from "../../Components/SnackBar";
import PhotoModal from "./PhotoModal";
import { connect } from "react-redux";
import {
  Paper,
  Dialog,
  Divider,
  InputLabel,
  Input,
  InputAdornment,
  FormControlLabel,
  Switch,
  Link,
} from "@material-ui/core";
import profile from "../../assets/imgs/profile.jpg";
import { updateUser, confirmMail } from "../../Redux/actions/users";

import EditIcon from "@material-ui/icons/Edit";
import CancelScheduleSendIcon from "@material-ui/icons/CancelScheduleSend";
import SendIcon from "@material-ui/icons/Send";
import Security from "./Security";

const Profile = (props) => {
  const user = props.user.user;
  const [openPhoto, setOpenPhoto] = useState(false);
  const [openSecurity, setOpenSecurity] = useState(false);
  const [checkSwitch, setCheckSwitch] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [inputName, setInputName] = useState(true);
  const [inputMail, setInputMail] = useState(true);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("info");
  const [message, setMessage] = useState("");

  const handlePhotoModal = () => {
    setOpenPhoto(!openPhoto);
  };
  const handleSecurityModal = () => {
    setOpenSecurity(!openSecurity);
    setCheckSwitch(!checkSwitch);
  };

  const openSnackBar = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setMessage("");
      setType("info");
    }, 2500);
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

  return (
    <div>
      {user && (
        <>
          <Paper style={{ width: "80vw", margin: "3% auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                src={
                  user.image_path.includes("http")
                    ? user.image_path
                    : user.image_path
                    ? API_URL_IMAGES + user.image_path
                    : profile
                }
                alt=''
                style={{
                  maxWidth: "25vw",
                  margin: "1rem",
                  cursor: "pointer",
                  objectFit: "contain",
                }}
                onClick={handlePhotoModal}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "5%",
                  marginTop: "5%",
                }}>
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
                      <EditIcon
                        onClick={handleInputName}
                        style={{ cursor: "pointer" }}
                      />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment>
                      {inputName ? (
                        <CancelScheduleSendIcon style={{ cursor: "pointer" }} />
                      ) : (
                        <SendIcon
                          onClick={handleEdit}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </InputAdornment>
                  }
                />
                <br />
                <Divider />
                <br />
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
                        <EditIcon
                          onClick={handleInputMail}
                          style={{ cursor: "pointer" }}
                        />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment>
                        {inputMail ? (
                          <CancelScheduleSendIcon style={{ cursor: "pointer" }} />
                        ) : (
                          <SendIcon
                            onClick={handleEdit}
                            style={{ cursor: "pointer" }}
                          />
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

                <br />
                <Divider />
                <br />
                <FormControlLabel
                  control={
                    <Switch
                      color='secondary'
                      checked={checkSwitch}
                      onChange={handleSecurityModal}
                    />
                  }
                  label='Seguridad'
                  labelPlacement='end'
                />
              </div>
            </div>
          </Paper>
          <Dialog open={openPhoto} onClose={handlePhotoModal} fullWidth>
            <PhotoModal
              image={user.image_path}
              handlePhotoModal={handlePhotoModal}
            />
          </Dialog>
          <SnackBar type={type} open={open} message={message} />
          <Dialog open={openSecurity} onClose={handleSecurityModal} fullWidth>
            <Security handlePasswordModal={handleSecurityModal} />
          </Dialog>
        </>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({ user: state.user });
export default connect(mapStateToProps)(Profile);
