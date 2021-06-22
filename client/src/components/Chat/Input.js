import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";

const Input = ({ message, setMessage, sendMessage }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return (
    <div>
      <h4 style={{ textAlign: "right" }}>{user && user.name}</h4>
      {ind === -1 ? (
        <h3>Welcome to Chat Rooms</h3>
      ) : (
        <form className="form">
          <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={(event) =>
              event.key === "Enter" ? sendMessage(event) : null
            }
          />
          <button className="sendButton" onClick={(e) => sendMessage(e)}>
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default Input;
