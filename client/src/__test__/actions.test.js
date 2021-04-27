import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import "@testing-library/jest-dom/extend-expect";
import { USER_LOADING, USER_LOADED } from "../1. actions/types";
import { loadUser } from "../1. actions/authactions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Redux user action", () => {
  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it("Gets user data", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: {
            _id: "986",
            user_name: "Barney Morris",
            email: "barry@reddit.com",
            super_user: false,
          },
        },
      });
    });

    const expectedActions = [
      { type: USER_LOADING },
      {
        type: USER_LOADED,
        payload: {
          data: {
            _id: "986",
            user_name: "Barney Morris",
            email: "barry@reddit.com",
            super_user: false,
          },
        },
      },
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(loadUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
