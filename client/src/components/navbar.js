/* eslint-disable no-undef */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Material UI
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Tooltip from "@material-ui/core/Tooltip";

// React Router
import { withRouter } from "react-router-dom";
//Redux action
import { logout, loadUser } from "../1. actions/authactions";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(10),
  },
  title: {
    flexGrow: 1,
    color: "ghostwhite",
  },
});

//NavBar component
class NavBar extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
  };
  componentDidMount() {
    // this.props.loadUser();
  }
  // Logs out the user
  logOut = () => {
    this.props.logout();
    this.props.history.push("/");
  };

  // Redirects to the dasboard
  openDashboard = () => {
    this.props.history.push("/dash");
  };

  // Redirects to the register user page
  register = () => {
    this.props.history.push("/sign-up");
  };

  // Redirects to the login page
  login = () => {
    this.props.history.push("/login");
  };

  render() {
    const { isAuthenticated, classes, user } = this.props;

    // Authenticated links
    const authLinks = (
      <React.Fragment>
        <Tooltip title="Opens the Dashboard">
          <button
            className="navbtn"
            style={{
              color: "ghostwhite",
              marginLeft: "10rem",
            }}
            onClick={this.openDashboard}
          >
            <span className="btnspan">Dashboard</span>
            <span className="touchripple"></span>
          </button>
        </Tooltip>
        <Tooltip title="Logout the user">
          <button className="navbtn" onClick={this.logOut}>
            <span className="btnspan">Logout</span>
            <span className="touchripple"></span>
          </button>
        </Tooltip>

        <Tooltip title="User currently logged in">
          <span style={{ fontSize: "smaller", padding: "1rem" }}>
            {" "}
            {user ? user.user_name : ""}
          </span>
        </Tooltip>
      </React.Fragment>
    );

    // Links that show when no one is logged in
    const guestLinks = (
      <React.Fragment>
        <Tooltip title="Go to the sign-up page">
          <button className="navbtn" onClick={this.register}>
            <span className="btnspan">Signup</span>
            <span className="touchripple"></span>
          </button>
        </Tooltip>
        <Tooltip title="Go to the login page">
          <button className="navbtn" onClick={this.login}>
            <span className="btnspan">Login</span>
            <span className="touchripple"></span>
          </button>
        </Tooltip>{" "}
      </React.Fragment>
    );

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          // style={{ minHeight: "10vh" }}
          className={classes.appBar}
        >
          <Toolbar>
            <Typography
              variant="h4"
              className={classes.title}
              data-testid="navbar-header"
            >
              Conference Centre Events
            </Typography>

            {isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // msg: state.auth.msg,
  // error: state.error,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { logout, loadUser })(withRouter(NavBar))
);
