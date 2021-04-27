/* eslint-disable no-undef */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getEvents,
  editEvent,
  addEvent,
  deleteEvent,
} from "../../1. actions/eventactions";

//components
import EditEventModal from "./editevent";
import AddEventModal from "./addevent";

//Material UI
import Tooltip from "@material-ui/core/Tooltip";
import { MdDelete, MdEdit } from "react-icons/md";
//Reactstrap
import { Table } from "reactstrap";

//Component to manage events
class ManageEvent extends React.Component {
  state = {
    addeventmodal: false,
    editeventmodal: false,
    chng_event: null,
    name: "",
    description: "",
    date: "",
    presenter: "",
  };

  static propTypes = {
    getEvents: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func,
    editEvent: PropTypes.func,
    events: PropTypes.object,
    addEvent: PropTypes.func,
  };

  componentDidMount() {
    this.props.getEvents();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Opens the add event modal
  openaddEvent = () => {
    this.setState({
      addeventmodal: true,
    });
  };

  //Opens the edit event modal
  openeditEvent = (event) => {
    this.setState({
      editeventmodal: true,
      chng_event: event,
    });
  };

  //Hides the edit event modal and updates the state for presenter, date and chng_event
  modalHide = () => {
    this.setState({
      editeventmodal: false,
      chng_event: null,
      presenter: "",
      date: "",
    });
  };
  //Hides the add event modal and sets event variables to nothing
  modalHideAdd = () => {
    this.setState({
      addeventmodal: false,
      name: "",
      description: "",
      date: "",
      presenter: "",
    });
  };

  //Hides the edit event modal
  toggleEdit = () => {
    this.setState({ editeventmodal: false });
  };

  //Updates an event
  updateEvent = (e) => {
    e.preventDefault();
    const { presenter, date, chng_event } = this.state;

    const updatedEvent = {
      _id: chng_event._id,
      presenter: presenter ? presenter : chng_event.presenter,
      date: date ? date : chng_event.date,
    };

    this.props.editEvent(updatedEvent);

    this.modalHide();
    this.props.getEvents();
  };

  //Deletes selected event
  deleteClick = (id) => {
    this.props.deleteEvent(id);
  };

  //Creates a new event
  createEvent = (e) => {
    e.preventDefault();
    const { name, description, date, presenter } = this.state;

    const newEvent = {
      name,
      description,
      date,
      presenter,
    };
    this.props.addEvent(newEvent);

    this.props.getEvents();
    this.modalHideAdd();
  };

  //Hides the add event modal
  toggleAdd = () => {
    this.setState({ addeventmodal: false });
  };

  //Truncates the date field to 10 characters
  truncate = (str) => {
    return str.length > 10 ? str.substring(0, 10) : str;
  };

  render() {
    const { events } = this.props.event;

    const eventList = events.map((event) => (
      <tr key={event._id}>
        <td>{event.name}</td>
        <td>{event.description}</td>
        <td>{event.presenter}</td>
        <td>{this.truncate(event.date)}</td>
        <td>
          <Tooltip title="edit event">
            <button
              className="editbtn"
              onClick={this.openeditEvent.bind(this, event)}
            >
              <MdEdit />
            </button>
          </Tooltip>
          <Tooltip title="delete event">
            <button
              className="deletebtn"
              onClick={this.deleteClick.bind(this, event._id)}
            >
              <MdDelete />
            </button>
          </Tooltip>
        </td>
      </tr>
    ));

    return (
      <div>
        <EditEventModal
          modal={this.state.editeventmodal}
          onChange={this.onChange}
          updateEvent={this.updateEvent}
          toggle={this.toggleEdit}
        />
        <AddEventModal
          modal={this.state.addeventmodal}
          onChange={this.onChange}
          createEvent={this.createEvent}
          toggle={this.toggleAdd}
        />

        <div className="eventsWrapper">
          <div className="eventsContainer">
            <div className="eventsHeader">
              <h1>Manage Events</h1>
            </div>
            <br />
            <br />

            <div className="eventsSubtext">
              <p>
                Upcoming Events
                <br />
              </p>
              <Table className="dataTable" responsive size="sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Presenter</th>
                    <th>Date</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>{eventList}</tbody>
              </Table>

              <Tooltip title="Add new event">
                <button className="eventbtn" onClick={this.openaddEvent}>
                  Add Event
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(mapStateToProps, {
  getEvents,
  editEvent,
  addEvent,
  deleteEvent,
})(ManageEvent);
