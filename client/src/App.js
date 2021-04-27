import React from "react";
//Style
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//React-router
import { Switch, Route } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { loadUser } from "./1. actions/authactions";

//components
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/home";
import NavBar from "./components/navbar";
import Welcome from "./components/welcome";
import Dashboard from "./components/dashboard";
import ManageEvent from "./components/events/manageevent";
import ViewEvents from "./components/events/viewevents";
import ManageUser from "./components/users/manageuser";
import PrivateRoute from "./routes/privateroute";

class App extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="App">
        <header>
          <NavBar />
        </header>

        <Switch>
          {/* Public Routes */}
          <Route path="/" exact component={Welcome} />
          <Route path="/login" exact component={Login} />
          <Route path="/sign-up" exact={true} component={Signup} />

          {/* Private Routes */}
          <PrivateRoute
            path="/dash"
            exact={true}
            isAuthenticated={isAuthenticated}
          >
            <Dashboard />
          </PrivateRoute>

          <Route
            path="/home"
            exact={true}
            //isAuthenticated={isAuthenticated}
            component={Home}
          />

          <PrivateRoute
            path="/manageevent"
            exact={true}
            isAuthenticated={isAuthenticated}
          >
            {" "}
            <ManageEvent />
          </PrivateRoute>

          <PrivateRoute
            path="/viewevents"
            exact={true}
            isAuthenticated={isAuthenticated}
          >
            {" "}
            <ViewEvents />
          </PrivateRoute>

          <PrivateRoute
            path="/manageuser"
            exact={true}
            isAuthenticated={isAuthenticated}
          >
            {" "}
            <ManageUser />
          </PrivateRoute>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loadUser })(App);
