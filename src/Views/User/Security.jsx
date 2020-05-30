import React, { useEffect, useState, useRef } from "react";
import {
  Paper,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { getPassword, renewPassword, deleteUser } from "../../Redux/actions/users";
import SnackBar from "../../Components/SnackBar";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import { red } from "@material-ui/core/colors";

const RedCheckbox = withStyles({
  root: {
    color: "#d50000",
    "&$checked": {
      color: red[900],
    },
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

const Security = ({ handlePasswordModal }) => {
  //ToDo: TODO
  const [actualPass, setActualPass] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("info");
  const [message, setMessage] = useState("");

  const step1Ref = useRef();
  const step2Ref = useRef();

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== newPassword) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule("isPasswordCorrect", (value) => {
      if (value !== actualPass) {
        return false;
      }
      return true;
    });
    return () => {
      ValidatorForm.removeValidationRule("isPasswordMatch");
      ValidatorForm.removeValidationRule("isPasswordCorrect");
    };
  }, [repeatNewPassword, actualPass, newPassword]);

  // useEffect(() => {
  //   let mounted = true;
  //   if (mounted) {
  //     getPassword().then((res) => {
  //       setActualPass(res.data);
  //     });
  //     return () => {
  //       mounted = false;
  //       clearTimeout(handleSubmit);
  //     };
  //   }
  // }, []);

  const handleSubmit = () => {
  //   renewPassword(oldPassword, newPassword, actualPass)
  //     .then(() => {
  //       setMessage("Datos Actualizados");
  //       setType("success");
  //       openSnackBar();
  //     })
  //     .catch(() => {
  //       setMessage("Inténtalo de nuevo");
  //       setType("error");
  //       openSnackBar();
  //     });
  //   setTimeout(() => {
  //     handlePasswordModal();
  //   }, 2500);
  };

  const step1 = () => {
    step1Ref.current.style.display = "";
  };

  const step2 = () => {
    step2Ref.current.style.display = "";
    step2Ref.current.style.color = "red";
  };

  const handleDeleteUser = () => {
    deleteUser()
      .then(() => {
        setMessage("Te echaremos de menos");
        setType("warning");
        openSnackBar();
      })
      .catch(() => {
        setMessage("Inténtalo de nuevo");
        setType("info");
        openSnackBar();
      });
    setTimeout(() => {
      handlePasswordModal();
      window.location.pathname = "/";
    }, 2500);
  };

  const openSnackBar = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setMessage("");
      setType("info");
    }, 2500);
  };

  return (
    <Paper>
      <h3>¿Quieres cambiar tu contraseña?</h3>
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={(errors) => console.log(errors)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <TextValidator
          name='oldPassword'
          onChange={(event) => {
            setOldPassword(event.target.value);
          }}
          value={oldPassword}
          variant='outlined'
          required
          label='Contraseña actual'
          type='password'
          validators={[
            "minStringLength:6",
            "matchRegexp:^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!+*=@#$%^&])(?=.{6,})",
          ]}
          errorMessages={[
            "Longitud mínima: 6 caracteres",
            "Debe contener minúscula, mayúscula, número y caracter especial",
          ]}
        />
        <br />
        <TextValidator
          name='newPassword'
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
          value={newPassword}
          variant='outlined'
          required
          label='Nueva contraseña'
          type='password'
          validators={[
            "minStringLength:6",
            "matchRegexp:^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!+*=@#$%^&])(?=.{6,})",
          ]}
          errorMessages={[
            "Longitud mínima: 6 caracteres",
            "Debe contener minúscula, mayúscula, número y caracter especial",
          ]}
        />
        <br />
        <TextValidator
          name='repeatNewPassword'
          onChange={(event) => {
            setRepeatNewPassword(event.target.value);
          }}
          value={repeatNewPassword}
          variant='outlined'
          required
          label='Repite la nueva contraseña'
          type='password'
          validators={["isPasswordMatch"]}
          errorMessages={["Las contraseñas no coinciden"]}
        />
        <br />
        <Button type='submit' variant='contained' color='secondary' size='small'>
          Cambiar contraseña
        </Button>
      </ValidatorForm>
      <br />
      <FormGroup row style={{ margin: "1% 10%" }}>
        <FormControlLabel
          control={<Checkbox onChange={step1} name='erase1' />}
          label='Borrar Usuario'
          color='primary'
        />
        <FormControlLabel
          style={{ display: "none", color: "red" }}
          ref={step1Ref}
          control={<Checkbox onChange={step2} name='erase2' />}
          label='¿Seguro?'
        />
        <FormControlLabel
          style={{ display: "none" }}
          ref={step2Ref}
          control={
            <RedCheckbox
              icon={<RemoveCircleOutlineRoundedIcon />}
              checkedIcon={<RemoveCircleRoundedIcon />}
              onChange={handleDeleteUser}
            />
          }
          name='erase3'
          label='¿¿ESTÁS SEGURO??'
        />
      </FormGroup>
      <SnackBar type={type} open={open} message={message} />
    </Paper>
  );
};

export default Security;
