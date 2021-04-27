/* eslint-disable no-undef */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { register } from "../1. actions/authactions";
import { clearErrors } from "../1. actions/erroractions";

//material ui
import Alert from "@material-ui/lab/Alert";

export class Signup extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  state = {
    user_name: "",
    email: "",
    password: "",
    error: null,
  };

  componentDidUpdate(prevProps) {
    const { error, user } = this.props;

    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ error: error.msg.msg });
      } else {
        this.setState({
          error: null,
        });
      }
    }
    if (user) {
      this.props.history.push("/login");
    }
  }

  // on change event sets the state to equal value of the input boxes
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Registers the user in the database
  Register = async (e) => {
    e.preventDefault();
    const { user_name, email, password } = this.state;

    if (user_name && email && password) {
      if (password.length >= 8) {
        this.setState({
          error: null,
        });
      }
      this.props.clearErrors();
    }

    const newUser = {
      user_name,
      email,
      password,
    };

    // calls the redux action in authacctions to register the user
    this.props.register(newUser);
  };

  render() {
    return (
      <div className="signupWrapper">
        <div className="signupContainer">
          <div className="signupHeader">
            <h1>Register Account</h1>
          </div>
          {this.state.error ? (
            <Alert severity="error">{this.state.error}</Alert>
          ) : null}
          <br />
          <div className="signupForm">
            <input
              type="text"
              id="user_name"
              name="user_name"
              placeholder="User name ..."
              onChange={this.onChange}
            ></input>{" "}
            <br />
            <br />
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
            <button className="signupbtns orangeButton" onClick={this.Register}>
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  msg: state.auth.msg,
  error: state.error,
  user: state.auth.user,
});

export default connect(mapStateToProps, { register, clearErrors })(Signup);
