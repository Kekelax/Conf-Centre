import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

//Component to display the home page
export default function Welcome() {
  return (
    <div className="welcomeWrapper">
      <div className="welcomeContainer">
        <div className="welcomeHeader">
          <h1>Welcome</h1>
          <br />
          <br />
        </div>
        <div className="welcomeSubtext">
          <p>
            Please login or register to view the dashboard. <br />
          </p>
        </div>
        <row>
          <Tooltip title="Go to the login page">
            <a href="/login">
              <button className="welcomebtn orangeButton">Login</button>
            </a>
          </Tooltip>

          <Tooltip title="Go to the sign-up page">
            <a href="/sign-up">
              <button className="welcomebtn orangeButton">Register</button>
            </a>
          </Tooltip>
        </row>
      </div>
    </div>
  );
}
