/* eslint-disable no-undef */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { IconContext } from "react-icons";
import { FaSpotify } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import Alert from "@material-ui/lab/Alert";
import Tooltip from "@material-ui/core/Tooltip";
//Redux
import { connect } from "react-redux";
import { login, loginGoogle, loginSpotify } from "../1. actions/authactions";
import { clearErrors } from "../1. actions/erroractions";

export class Login extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    loginGoogle: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  state = {
    email: "",
    password: "",
    error: null,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ error: error.msg.msg });
      } else {
        this.setState({
          error: null,
        });
      }
    }

    if (isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Normal authentication
  loginUser = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    this.props.login(user);
  };

  //Google login
  googleLogin = () => {
    this.props.loginGoogle();
  };
  //Spotify login
  spotifyLogin = () => {
    this.props.loginSpotify();
  };

  render() {
    return (
      <div className="loginWrapper">
        <div className="loginContainer">
          <div className="loginHeader">
            <h1 date-testid="login-header">Sign In</h1>
          </div>
          {this.state.error ? (
            <Alert severity="error">{this.state.error}</Alert>
          ) : null}
          <div className="loginForm">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email ..."
              onChange={this.onChange}
            ></input>{" "}
            <br />
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password ..."
              onChange={this.onChange}
            ></input>{" "}
            <br />
            <br />
            <Tooltip title="Log into account">
              <button
                className="loginbtns orangeButton"
                onClick={this.loginUser}
              >
                Login
              </button>
            </Tooltip>
            <a href="/signup">
              <p>Create an Account</p>
            </a>
          </div>
          <div className="loginSubtext">
            <p>or</p>
          </div>
          <IconContext.Provider value={{ className: "react-icons" }}>
            <div className="loginSocialBtns">
              <Tooltip title="Log in using your Spotify account">
                <button className="loginbtns " onClick={this.spotifyLogin}>
                  <FaSpotify />
                  Login with Spotify
                </button>
              </Tooltip>{" "}
              <br />
              <Tooltip title="Log in using your Google account">
                <button
                  className="loginbtns googleButton"
                  onClick={this.googleLogin}
                >
                  <FaGoogle />
                  Login with Google
                </button>
              </Tooltip>
            </div>
          </IconContext.Provider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  msg: state.auth.msg,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, {
  login,
  clearErrors,
  loginGoogle,
  loginSpotify,
})(withRouter(Login));
