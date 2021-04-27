import { EDIT_USER, USERS_LOADING, GET_USERS } from "./types";
import axios from "axios";

import { returnErrors } from "./erroractions";

/* >>> GET USERS  <<< */

export const getUsers = () => (dispatch) => {
  dispatch(setUsersLoading());

  axios
    .get("/api/users", { withCredentials: true })
    .then((res) => {
      dispatch({ type: GET_USERS, payload: res.data });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

/* >>> EDIT USER <<< */
export const editUser = (user) => (dispatch) => {
  //request header
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const updateUser = {
    super_user: user.super_user,
  };

  axios
    .put(`/api/users/${user._id}`, updateUser, config, {
      withCredentials: true,
    })
    .then((res) => dispatch({ type: EDIT_USER, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

/* >>> SET EVENTS LOADING TO TRUE <<< */
export const setUsersLoading = () => {
  return {
    type: USERS_LOADING,
  };
};
