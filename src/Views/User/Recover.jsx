import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, CardHeader } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { recoverPassword } from "../../Redux/actions/users";
import SnackBar from "../../Components/SnackBar";

const Recover = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const token = props.match.params.passToken;
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("info");
  const [message, setMessage] = useState("");

  useEffect(() => {
      ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
        if (value !== newPassword) {
          return false;
        }
        return true;
      });
      return () => {
        ValidatorForm.removeValidationRule("isPasswordMatch");
      };
    },
    [reNewPassword, newPassword]
  );

  const openSnackBar = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setMessage("");
      setType("info");
    }, 2500);
  };

  const handleSubmit = () => {
    recoverPassword(token, newPassword)
      .then(() => {
        setMessage("Contraseña cambiada con éxito");
        setType("success");
        openSnackBar();
        setTimeout(() => {
          props.history.push("/login");
        }, 2500);
      })
      .catch(() => {
        setMessage("Vuelve a intentarlo");
        setType("error");
        openSnackBar();
      });
  };

  return (
    <Card
      raised
      style={{
        maxWidth:"30rem",
        margin: "10% auto 1%",
      }}>
      <CardHeader title='Aquí puedes crear una nueva contraseña para tu cuenta.' />
      <CardContent>
        <ValidatorForm
          onSubmit={handleSubmit}
          onError={(errors) => console.log(errors)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
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
          <br/>
          <TextValidator
            name='reNewPassword'
            onChange={(event) => {
              setReNewPassword(event.target.value);
            }}
            value={reNewPassword}
            variant='outlined'
            required
            label='Repite la nueva contraseña'
            type='password'
            validators={["isPasswordMatch"]}
            errorMessages={["Las contraseñas no coinciden"]}
          />
          <br/>
          <Button type='submit' variant='contained' color='secondary' size='small'>
            Actualizar contraseña
          </Button>
        </ValidatorForm>
      </CardContent>
      <SnackBar type={type} open={open} message={message} />
    </Card>
  );
};

export default Recover;