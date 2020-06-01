import React, { useEffect } from "react";
import background from "../../assets/imgs/boardgames.jpg";
import { confirmedEmail } from "../../Redux/actions/users";

const MailConfirmed = (props) => {
  const token = props.match.params.passToken;
  useEffect(() => {
    confirmedEmail(token)
      .then((_res) => {
        setTimeout(() => {
          props.history.push("/profile");
        }, 2500);
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      clearTimeout();
    };
  }, [token]);

  return (
    <img
      style={{
        objectFit: "cover",
        margin: "0 auto",
        width:"100%"
      }}
      src={background}
      alt='Congrats, mail confirmed'
    />
  );
};

export default MailConfirmed;
