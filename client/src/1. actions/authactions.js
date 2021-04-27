import axios from "axios";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  EVENTS_CLEAR,
  USERS_CLEAR,
} from "./types";
import { returnErrors } from "./erroractions";

/* >>>> LOAD USER <<<< */
export const loadUser = () => (dispatch) => {
  //user loading changes isLoading from false to true
  dispatch({ type: USER_LOADING });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios
    .get("/auth/user", config, { withCredentials: true })
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      //gets the msg and status values
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

/* >>>> REGISTER USER <<<< */
export const register = ({ user_name, email, password }) => (dispatch) => {
  //Request header

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify({ user_name, email, password });

  axios
    .post("/auth/register", body, config, { withCredentials: true })
    .then((res) => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))

    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

/* >>>> LOGIN USER - LOCAL <<<< */
export const login = ({ email, password }) => (dispatch) => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/auth/login", body, config, { withCredentials: true })
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      // sends the error data to erroraction.js error with arguments --> (msg, status, id -> LOGIN-FAIL)
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );

      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

/* >>>> LOGIN USER - GOOGLE <<<< */
export const loginGoogle = () => {
  //window.open("http://localhost:4000/auth/google", "_self") in development
  window.open("/auth/google", "_self");
};

/* >>>> LOGIN USER - TWITTER <<<< */
export const loginSpotify = () => {
  //window.open("http://localhost:4000/auth/spotify", "_self") in development
  window.open("/auth/spotify", "_self");
};

/* >>>> LOGIN USER - SUCCESSFUL <<<< */
export const loginSuccess = () => (dispatch) => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .get("/auth/login/success", config, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })

    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

/* >>>> LOGOUT USER <<<< */
export const logout = () => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .get("/auth/log-out", config, { withCredentials: true })
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data,
      });

      dispatch({
        type: EVENTS_CLEAR,
      });
      dispatch({ type: USERS_CLEAR });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGOUT_FAIL")
      );
    });
};
