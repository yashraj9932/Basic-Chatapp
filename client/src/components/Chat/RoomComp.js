import React, { useContext, useState } from "react";
import ChatContext from "../../context/chat/chatContext";

const RoomComp = () => {
  const chatContext = useContext(ChatContext);
  const { addRoom } = chatContext;
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const onClick = (e) => {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name) {
      addRoom({ name });
    }
  };

  return (
    <div style={{ margin: "0 auto", float: "center" }}>
      <h3>Welcome to the ChatRooms</h3>
      <a href="#*" onClick={onClick} style={{ fontSize: "1.5em" }}>
        Create Room
      </a>
      {show && (
        <form style={{ marginRight: "0", marginTop: "5%" }} onSubmit={onSubmit}>
          <input
            type="text"
            className="form-control"
            value={name}
            placeholder="R00MA"
            style={{ width: "60%" }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button
            className="btn btn-dark btn-lg btn-block"
            style={{
              margin: "2% auto",
              float: "left",
              width: "60%",
              marginTop: "5%",
            }}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default RoomComp;
