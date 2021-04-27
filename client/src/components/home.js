/* eslint-disable no-undef */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

import { loginSuccess } from "../1. actions/authactions";

//Component to display the welcome page displayed after successfull
//login
class Home extends React.Component {
  static propTypes = {
    loginSuccess: PropTypes.func.isRequired,
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool,
  };

  //Loads the logged in user on successful login
  componentDidMount() {
    this.props.loginSuccess();
  }

  //Opens the dashboard
  openDashboard = () => {
    this.props.history.push("/dash");
  };
  render() {
    const { user } = this.props;
    return (
      <div className="homeWrapper">
        <div className="homeContainer">
          <div className="homeHeader">
            <h1>Home Page</h1>
          </div>
          <br />
          <br />

          <div className="homeSubtext">
            <p>
              Welcome <br />
              <span>{user ? user.user_name : ""}</span>
            </p>
          </div>
          <Tooltip title="Go to the Dashboard">
            <button
              className="homebtn orangeButton"
              onClick={this.openDashboard}
            >
              Proceed to the Dashboard
            </button>
          </Tooltip>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginSuccess })(withRouter(Home));
