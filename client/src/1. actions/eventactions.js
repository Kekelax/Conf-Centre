//ACTIONS
import {
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  EVENTS_LOADING,
  EDIT_EVENT,
} from "./types";

import { returnErrors } from "./erroractions";
import axios from "axios";

/* >>> GET ALL EVENTS <<< */

export const getEvents = () => (dispatch) => {
  dispatch(setEventLoading());

  axios
    .get("/api/events/all", { withCredentials: true })
    .then((res) => dispatch({ type: GET_EVENTS, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

/* >>> SET EVENTS LOADING TO TRUE <<< */
export const setEventLoading = () => {
  return {
    type: EVENTS_LOADING,
  };
};

/* >>> CREATE AN EVENT <<< */

export const addEvent = (event) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post("/api/events", event, config, { withCredentials: true })
    .then((res) => dispatch({ type: ADD_EVENT, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

/* >>> EDIT AN EVENT <<< */

export const editEvent = (event) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //body
  const updateEvent = {
    presenter: event.presenter,
    date: event.date,
  };
  axios
    .put(`/api/events/${event._id}`, updateEvent, config, {
      withCredentials: true,
    })
    .then((res) => dispatch({ type: EDIT_EVENT, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

/* >>> DELETE AN EVENT <<< */

export const deleteEvent = (id) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .delete(`/api/events/${id}`, config, { withCredentials: true })
    .then((res) => dispatch({ type: DELETE_EVENT, payload: id }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
