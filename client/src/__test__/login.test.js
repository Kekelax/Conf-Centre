import React from "react";
import { Login } from "../components/login";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import ReactDOM from "react-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const initialState = {};
const mockStore = configureStore([]);

let store;

const mockProps = {
  login: jest.fn(() => {
    return 1;
  }),
  error: {
    msg: {},
    status: null,
    id: null,
  },
  loginGoogle: jest.fn(() => {
    return "Google logged in";
  }),
  clearErrors: jest.fn(() => {
    return " Errors cleared";
  }),
};

it("Login component like the snapshot", () => {
  store = mockStore(initialState);

  const tree = renderer
    .create(
      <Provider store={store}>
        <Login {...mockProps} />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Login component renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Login {...mockProps} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
