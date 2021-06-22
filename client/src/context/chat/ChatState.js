import React, { useReducer } from "react";
import axios from "axios";
import ChatContext from "./chatContext";
import chatReducer from "./chatReducer";
import { GET_ALL, SET_ERRORS } from "../types";

const ChatState = (props) => {
  const initialState = {
    errors: null,
    rooms: null,
  };
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const getRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/room/getrooms");
      //   console.log(res.data);
      dispatch({
        type: GET_ALL,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    }
  };

  return (
    <ChatContext.Provider
      value={{
        rooms: state.rooms,
        error: state.error,
        getRooms,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
