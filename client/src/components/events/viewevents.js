/* eslint-disable no-undef */
import React, { Component } from "react";

//Redux - get state from redux to react
import { connect } from "react-redux";
import { getEvents } from "../../1. actions/eventactions";

import PropTypes from "prop-types";

//Reactstrap
import { Row, Col } from "reactstrap";

//React awesome slider
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";

//Component to view events
class ViewEvents extends Component {
  static propTypes = {
    getEvents: PropTypes.func.isRequired,
  };

  componentDidMount() {
    //get events from reducer
    this.props.getEvents();
  }
  truncate = (str) => {
    return str.length > 10 ? str.substring(0, 10) : str;
  };

  render() {
    const { events } = this.props.event;
    const eventItems = events.map((event) => (
      <div key={event._id}>
        <h3>{event.name}</h3>
        <span>{event.description}</span>
        <Row>
          <Col>
            <p className="eventdata">Presenter: {event.presenter}</p>
          </Col>
          <Col>
            <p className="eventdata"> Date: {this.truncate(event.date)}</p>
          </Col>
        </Row>
      </div>
    ));
    const styles = {
      "--content-background-color": "transparent",
      "--control-bullet-color":
        "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
      "--organic-arrow-color": "#fe6b8b",
      "--control-button-background": "transparent",

      "--control-bullet-active-color":
        "linear-gradient(45deg,#fe6b8b 30%, #ff8e53 90%)",
    };
    return (
      <div className="aweSlider">
        <div className="viewWrapper">
          <div className="viewContainer">
            <div className="viewHeader">
              <h1 className="heading1">Upcoming Events</h1>
              <AwesomeSlider animation="foldOutAnimation" style={styles}>
                {eventItems.length > 0 ? (
                  eventItems
                ) : (
                  <span>There are no events to display</span>
                )}
              </AwesomeSlider>
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

export default connect(mapStateToProps, { getEvents })(ViewEvents);
