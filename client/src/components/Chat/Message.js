import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";

const Message = ({ message }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return (
    <div>
      <p style={user._id === message.from ? same : other}>{message.text}</p>
    </div>
  );
};

const other = {
  backgroundColor: "blue",
  color: "black",
  padding: "1.5%",
  borderRadius: "15px",
};

const same = {
  backgroundColor: "black",
  color: "white",
  padding: "1.5%",
  borderRadius: "15px",
};

export default Message;
