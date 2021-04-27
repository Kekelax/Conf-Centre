import React from "react";
import Welcome from "../components/welcome";
import renderer from "react-test-renderer";

it("Welcome page renders correctly", () => {
  const tree = renderer.create(<Welcome />).toJSON();
  expect(tree).toMatchSnapshot();
});
