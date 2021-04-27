import React from "react";
import NavBar from "../components/navbar";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import reducer from "../2. reducers/index";
import { BrowserRouter as Router } from "react-router-dom";

//wrapper to help render redux connected components
function renderWithRedux(
  component,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(component, { wrapper: Wrapper, ...renderOptions });
}

test("Navbar heading renders correctly", () => {
  const component = renderWithRedux(
    <Router>
      <NavBar />
    </Router>
  );
  const headerEl = component.getByTestId("navbar-header");
  expect(headerEl.textContent).toBe("Conference Centre Events");
});
