import React from "react";

//Redux
import { connect } from "react-redux";
// react-router
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  /* isAuthenticated and component props are destructured as we need 
    them to make the route work. ...rest grabs all the other props that 
    have not been destructured eg. path, history exact etc*/
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) =>
      // if the user is authenticated the component is rendered else
      //redirect to login page
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
