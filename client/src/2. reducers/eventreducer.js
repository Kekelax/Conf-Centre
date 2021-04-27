import {
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  EVENTS_LOADING,
  EVENTS_CLEAR,
  EDIT_EVENT,
} from "../1. actions/types";

const initialState = {
  events: [],
  loading: false,
};

export default function EventReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case EVENTS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case ADD_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events],
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event._id !== action.payload),
      };

    case EDIT_EVENT:
      let updatedEvent = action.payload;
      let newEvents = state.events;

      //Finds the index of the updated event in the array and updates it
      let updtIndex = newEvents
        .map((eventData) => eventData._id)
        .indexOf(updatedEvent);
      newEvents[updtIndex] = {
        presenter: updatedEvent.presenter,
        date: updatedEvent.date,
      };

      return {
        ...state,
        events: newEvents,
      };

    case EVENTS_CLEAR:
      return {
        ...state,
        events: [],
        loading: false,
      };

    default:
      return state;
  }
}
