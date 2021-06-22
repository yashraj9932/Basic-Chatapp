import React from "react";

const RoomList = ({ index, room, setInd }) => {
  const onClick = (e) => {
    setInd(index);
  };

  return (
    <div style={{ backgroundColor: "#f2f3ff" }}>
      <p onClick={onClick} style={{ marginBottom: "0", padding: "5%" }}>
        {room.name}
        {" ( "}
        {room.users.length + " user(s))"}
      </p>
    </div>
  );
};

export default RoomList;
