import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import ChatContext from "../../context/chat/chatContext";
import Input from "./Input";
import RoomList from "./RoomList";

const Chat = () => {
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { getRooms, rooms } = chatContext;
  const [ind, setInd] = useState(-1);

  //   const EP = "localhost:5000";

  useEffect(() => {
    getRooms();
    // window.location.reload();
    // eslint-disable-next-line
  }, []);

  console.log(rooms);

  return (
    <div
      className="container"
      style={{ border: "1px solid black", height: "88vh" }}
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
                  var j = i;
                  return (
                    <RoomList key={j} index={i} room={room} setInd={setInd} />
                  );
                })}
            </div>
            <div></div>
          </div>
          <div className="col-sm-8">
            <div>
              <h4 style={{ textAlign: "right" }}>{user && user.name}</h4>
              <Input ind={ind} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
