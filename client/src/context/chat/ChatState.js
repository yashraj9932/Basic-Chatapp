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

  const addMessage = async (message, roomId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post(
        `http://localhost:5000/room/message/${roomId}`,
        message,
        config
      );
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    }
  };

  const addRoom = async (name) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log(name);

      await axios.post(`http://localhost:5000/room/addRoom`, name, config);
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    }
  };

  const addUser = async (phone, roomId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post(
        `http://localhost:5000/room/addUser/${roomId}/${phone}`,
        {},
        config
      );
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    }
  };

  const deleteAllMessage = async (roomId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.put(
        `http://localhost:5000/room/message/${roomId}`,
        {},
        config
      );
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
        addMessage,
        deleteAllMessage,
        addRoom,
        addUser,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
