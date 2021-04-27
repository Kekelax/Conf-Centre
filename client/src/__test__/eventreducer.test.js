import reducer from "../2. reducers/eventreducer";
import { EVENTS_LOADING, GET_EVENTS } from "../1. actions/types";
import "@testing-library/jest-dom/extend-expect";

const initialState = {
  events: [],
  loading: false,
};

describe("Event reducer", () => {
  it("Return the inital state", () => {
    expect(reducer(undefined, {})).toEqual({
      events: [],
      loading: false,
    });
  });
  it("handles EVENTS_LOADING", () => {
    expect(
      reducer(
        { ...initialState },
        {
          type: EVENTS_LOADING,
        }
      )
    ).toEqual({
      events: [],
      loading: true,
    });
  });

  it("Handles GET_EVENTS", () => {
    const action = {
      payload: {
        events: [
          {
            _id: "234",
            name: "Collecting Pebbles",
            description: "The art of collecting pebbles",
            presenter: "Dennis the Menace",
            date: "12/04/2021",
          },
          {
            _id: "235",
            name: "Finger Painting",
            description: "Finger paintng",
            presenter: "Charlotte Best",
            date: "12/08/2021",
          },
        ],
      },
    };
    expect(
      reducer(
        {},
        {
          type: GET_EVENTS,
          payload: {
            events: [
              {
                _id: "234",
                name: "Collecting Pebbles",
                description: "The art of collecting pebbles",
                presenter: "Dennis the Menace",
                date: "12/04/2021",
              },
              {
                _id: "235",
                name: "Finger Painting",
                description: "Finger paintng",
                presenter: "Charlotte Best",
                date: "12/08/2021",
              },
            ],
          },
        }
      )
    ).toEqual({
      events: action.payload.events,
      loading: false,
    });
  });
});
