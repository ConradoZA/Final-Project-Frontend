import React, { useState } from "react";
import { API_URL } from "../../api-config";
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
} from "@material-ui/core";
import profile from "../../assets/imgs/profile.jpg";
import { updateUser } from "../../Redux/actions/users";

import EditIcon from "@material-ui/icons/Edit";
import CancelScheduleSendIcon from "@material-ui/icons/CancelScheduleSend";
import SendIcon from "@material-ui/icons/Send";
import Security from "./Security";

const Profile = ({ user }) => {
  const [openPhoto, setOpenPhoto] = useState(false);
  const [openSecurity, setOpenSecurity] = useState(false);
  const [checkSwitch, setCheckSwitch] = useState(false);
  const [name, setName] = useState(user.user.name);
  const [email, setEmail] = useState(user.user.email);
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

  const handleEdit = () => {
    const userProfile = {
      name,
      email,
    };
    updateUser(userProfile)
      .then((res) => {
        setMessage("Datos Actualizados");
        setType("success");
        openSnackBar();
      })
      .catch(() => {
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
      {user.user && (
        <>
          <Paper style={{ width: "80vw", margin: "3% auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                src={
                  user.user.image.includes("http")
                    ? user.user.image
                    : user.user.image
                    ? API_URL + "/uploads/" + user.user.image
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
            <PhotoModal image={user.user.image} handlePhotoModal={handlePhotoModal} />
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
