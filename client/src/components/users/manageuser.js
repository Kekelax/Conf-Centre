/* eslint-disable no-undef */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Material UI
import { MdEdit } from "react-icons/md";
//Reactstrap
import { Table } from "reactstrap";

import EditUser from "./edituser";

import { getUsers, editUser } from "../../1. actions/useractions";

export class ManageUser extends React.Component {
  static propTypes = {
    getUsers: PropTypes.func,
  };

  state = {
    modal: false,
    chng_user: null,
    super_user: false,
  };

  componentDidMount() {
    this.props.getUsers();
  }

  //Opens edit user modal
  openModal = (user) => {
    this.setState({
      modal: true,
      chng_user: user,
    });
  };

  //Close edit user modal
  closeModal = () => {
    this.setState({ modal: false });
  };

  //set state on change of drop down
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // clear the state and close the modal
  clearState = () => {
    this.setState({
      chng_user: null,
      super_user: null,
      modal: false,
    });
  };

  // update the user in the database
  updateUser = (e) => {
    e.preventDefault();

    const { super_user } = this.state;
    const updatedUser = {
      _id: this.state.chng_user._id,
      super_user: super_user,
    };

    this.props.editUser(updatedUser);
    this.clearState();
    this.props.getUsers();
  };
  render() {
    const { users } = this.props.users;

    const userList = users.map((user) => (
      <tr key={user._id}>
        <td>{user.user_name}</td>
        <td>{user.email}</td>
        <td>{user.super_user.toString()}</td>
        <td>
          {/* <Tooltip title="edit user"> */}
          <button className="editbtn" onClick={this.openModal.bind(this, user)}>
            <MdEdit />
          </button>{" "}
          {/* </Tooltip>{" "} */}
        </td>
      </tr>
    ));
    return (
      <div>
        <EditUser
          modal={this.state.modal}
          updateUser={this.updateUser}
          onChange={this.onChange}
          toggle={this.closeModal}
          accessrights={this.state.super_user}
        />

        <div className="eventsWrapper">
          <div className="eventsContainer">
            <div className="eventsHeader">
              <h1>Manage Users</h1>
            </div>
            <br />
            <br />

            <div className="eventsSubtext">
              {userList ? (
                <Table className="userTable" responsive size="sm">
                  <thead>
                    <tr>
                      <th>User name</th>
                      <th>Email</th>
                      <th>Super user</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>{userList}</tbody>
                </Table>
              ) : (
                <span>You are not authorised to manage users!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.user,
});

export default connect(mapStateToProps, { getUsers, editUser })(ManageUser);
