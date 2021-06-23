import React, { useEffect, useState, useContext } from "react";
import Message from "./Message";
import io from "socket.io-client";
import AuthContext from "../../context/auth/authContext";
import ChatContext from "../../context/chat/chatContext";
import RoomComp from "./RoomComp";

let socket;

const Input = ({ ind }) => {
  const authContext = useContext(AuthContext);
  const chatContext = useContext(ChatContext);
  const { addMessage, deleteAllMessage, rooms, addUser } = chatContext;
  const { user } = authContext;

  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket = io("localhost:5000", { transports: ["websocket"] });
    if (ind !== -1) {
      socket.emit("join", rooms[ind]._id);
    }
    // eslint-disable-next-line
  }, [ind]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
      if (user._id === message.from) {
        addMessage(message, rooms[ind]._id);
      }
      setMessage("");
    });

    // socket.on("roomData", ({ users }) => {
    //   setUsers(users);
    // });
    // eslint-disable-next-line
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, rooms[ind]._id, user._id, () => {
        console.log("Ghus gaya");
      });
    }
  };

  useEffect(() => {
    if (ind !== -1) {
      setMessages([...rooms[ind].messages]);
    }
    // eslint-disable-next-line
  }, [ind]);

  console.log(messages);

  const onAddUser = (e) => {
    addUser(phone, rooms[ind]._id);
    setPhone("");
  };

  return (
    <div>
      {ind === -1 ? (
        <RoomComp />
      ) : (
        <div>
          <div style={{ height: "60vh" }}>
            {messages.map((message, i) => {
              return <Message key={i} message={message} />;
            })}
          </div>
          <form className="form">
            <input
              type="text"
              className="form-control"
              placeholder="Type a message..."
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={(event) =>
                event.key === "Enter" ? sendMessage(event) : null
              }
            />

            <button
              className="btn btn-primary btn-lg"
              style={{ margin: "2% auto", float: "right" }}
              onClick={(e) => {
                sendMessage(e);
              }}
            >
              Send
            </button>
          </form>
          <button
            className="btn btn-dark btn-lg"
            style={{ margin: "2% auto", float: "left" }}
            onClick={(e) => {
              deleteAllMessage(rooms[ind]._id);
            }}
          >
            Clear
          </button>
          <input
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            className="form-control"
            style={{ width: "30%", marginLeft: "2%", margin: "2% auto" }}
          />
          <button onClick={onAddUser} className="btn btn-dark btn-lg">
            Add User
          </button>
        </div>
      )}
    </div>
  );
};

export default Input;
