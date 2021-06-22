import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  OTHERUSER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SEARCHED_USERS,
  // CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: null,
    // user: null,
    user: localStorage.getItem("user"),
    otheruser: null,
    errors: null,
    token: localStorage.getItem("token"),
    loading: true,
    filtered: [],
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("http://localhost:5000/auth/currentuser");
      dispatch({
        type: USER_LOADED,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const urluser = async (id) => {
    try {
      const res = await axios.get(`/users/${id}`);
      dispatch({
        type: OTHERUSER_LOADED,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const register = async (body) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/register",
        body,
        config
      );
      console.log("yash");
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      console.log(error);
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response,
      });
    }
  };

  const login = async (body) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        body,
        config
      );
      // console.log(res.data);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response,
      });
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get("/users");
      dispatch({
        type: SEARCHED_USERS,
        payload: res.data.data,
      });
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        otheruser: state.otheruser,
        token: state.token,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        filtered: state.filtered,
        register,
        login,
        loadUser,
        logout,
        urluser,
        getAllUsers,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
