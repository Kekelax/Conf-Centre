/* eslint-disable no-undef */
import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "../1. actions/authactions";

import { GrGroup } from "react-icons/gr";
import { GrPlan } from "react-icons/gr";
import { GrSchedules } from "react-icons/gr";

//components
import ManageEvent from "./events/manageevent";
//material-ui
import { withStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Tooltip from "@material-ui/core/Tooltip";

//Styling
const drawerWidth = 200;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class Dashboard extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  };

  // Loads the logged in user
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const { user, classes } = this.props;

    // Normal user menu
    const userMenu = (
      <React.Fragment>
        <List>
          <ListItemLink href="/viewevents">
            <ListItemIcon>
              <GrPlan style={{ fontSize: "30px" }} />
            </ListItemIcon>
            <Tooltip title="View upcoming events">
              <ListItemText primary="View Events" />
            </Tooltip>
          </ListItemLink>
        </List>
      </React.Fragment>
    );

    //super user menu
    const adminMenu = (
      <React.Fragment>
        <div className="grid-container">
          <List>
            <ListItemLink href="/viewevents">
              <ListItemIcon>
                <GrPlan style={{ fontSize: "30px" }} />
              </ListItemIcon>
              <Tooltip title="View upcoming events">
                {/* <ListItemText primary="View Events" /> */}
                <h6>View Events</h6>
              </Tooltip>
            </ListItemLink>

            <ListItemLink href="/manageevent">
              <ListItemIcon>
                <GrSchedules
                  style={{
                    fontSize: "30px",
                  }}
                />
              </ListItemIcon>
              <Tooltip title="Add, edit or remove events">
                {/* <ListItemText primary="Manage Events" /> */}
                <h6>Manage Events</h6>
              </Tooltip>
            </ListItemLink>
          </List>

          <List>
            <ListItemLink href="/manageuser">
              <ListItemIcon>
                <GrGroup style={{ fontSize: "30px" }} />
              </ListItemIcon>
              <Tooltip title="User access management">
                {/* <ListItemText primary="Manage Users" /> */}
                <h6>Manage User</h6>
              </Tooltip>
            </ListItemLink>
          </List>
        </div>
      </React.Fragment>
    );

    return (
      <div>
        <div className="eventsWrapper">
          <div className="eventsContainer">
            <div className="eventsHeader">
              <h1>Dashboard</h1>
            </div>
            <div className={classes.root}>
              <CssBaseline />
              <Toolbar />
              <div>{user.super_user ? adminMenu : userMenu}</div>
            </div>
          </div>
        </div>

        <main className={classes.content}>
          <Switch>
            <Route path="/manageevents" exact>
              <ManageEvent />
            </Route>
          </Switch>
        </main>
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  auth: state.auth,
});

export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps, { loadUser })(Dashboard))
);
