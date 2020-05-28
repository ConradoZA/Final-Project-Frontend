import React, { useRef, useState } from "react";
import SnackBar from "../../Components/SnackBar";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  TextField,
  CardMedia,
} from "@material-ui/core";
import { API_URL } from "../../api-config";
import profile from "../../assets/imgs/profile.jpg";
import { updateUser, uploadImage } from "../../Redux/actions/users";

const PhotoModal = ({ image, handlePhotoModal }) => {
  const uploadRef = useRef();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("info");
  const [message, setMessage] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [direction, setDirection] = useState(image);

  const openSnackBar = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setMessage("");
      setType("info");
    }, 2500);
  };

  const handleEdit = () => {
    const user = { image: direction };
    updateUser(user)
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
    setTimeout(() => {
      handlePhotoModal();
    }, 2500);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("image", imageUpload, imageUpload.name);
    uploadImage(fd)
      .then((res) => {
        setMessage("Imagen subida");
        setType("success");
        openSnackBar();
      })
      .catch(() => {
        setMessage("Inténtalo de nuevo");
        setType("error");
        openSnackBar();
      });
    setTimeout(() => {
      handlePhotoModal();
    }, 2500);
  };

  return (
    <Card>
      <CardHeader title='Cambia tu imagen' />
      <CardMedia
        image={
          image.includes("http")
            ? image
            : image
            ? API_URL + "/uploads/" + image
            : profile
        }
      />
      <CardContent>
        <form
          onSubmit={handleUpload}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={() => {
              uploadRef.current.click();
            }}>
            Sube tu imagen
          </Button>
          <br />
          <input
            name='image'
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
            type='file'
            style={{ display: "none" }}
            ref={uploadRef}
          />
          <input
            disabled
            type='text'
            value={imageUpload.name}
            style={{ width: "80%" }}
          />
          <br />
          <Button type='submit' size='small' variant='contained' color='primary'>
            Subir
          </Button>
        </form>
        <br />
        <Divider />
        <p>Ó elige una imagen de internet, copia su dirección y pégala aquí:</p>
        <form
          onSubmit={handleEdit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <TextField
            name='image'
            variant='outlined'
            margin='dense'
            value={direction}
            onChange={(event) => {
              setDirection(event.target.value);
            }}
            label='Dirección http'
          />
          <br />
          <Button type='submit' size='small' variant='contained' color='primary'>
            Subir
          </Button>
        </form>
      </CardContent>
      <SnackBar type={type} open={open} message={message} />
    </Card>
  );
};

export default PhotoModal;
