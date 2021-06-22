import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import AuthContext from "../../context/auth/authContext";
import ChatContext from "../../context/chat/chatContext";
import Input from "./Input";
import RoomList from "./RoomList";

let socket;

const Chat = () => {
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { getRooms, rooms } = chatContext;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [ind, setInd] = useState(-1);
  //   const EP = "localhost:5000";
  useEffect(() => {
    socket = io("localhost:5000", { transports: ["websocket"] });

    socket.emit("join");
  }, []);

  useEffect(() => {
    // console.log("yashis");
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    // socket.on("roomData", ({ users }) => {
    //   setUsers(users);
    // });
  }, [messages]);

  useEffect(() => {
    getRooms();
    // eslint-disable-next-line
  }, []);

  console.log(rooms);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  // console.log(message, messages);
  return (
    <div
      className="container"
      style={{ border: "1px solid black", height: "80vh" }}
    >
      <div>
        <div className="row h-100" style={{ paddingTop: "2%" }}>
          <div className="col-sm-4" style={{ paddingLeft: "0px" }}>
            <h3
              onClick={() => {
                setInd(-1);
              }}
            >
              User Rooms
            </h3>
            <div
              style={{
                position: "relative",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {rooms &&
                rooms.map((room, i) => {
                  return (
                    <RoomList key={i} index={i} room={room} setInd={setInd} />
                  );
                })}
            </div>
          </div>
          <div className="col-sm-8">
            <div>
              <Input
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
