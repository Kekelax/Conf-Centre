import React from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
  Col,
  Row,
} from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";

//styling
const inputstyling = {
  letterSpacing: "2px",
  outline: "none",
  borderRadius: "25px",
  padding: "12px 15px",
  margin: "20px 0px",
  width: "100%",
  fontSize: "16px",
  border: "solid 1px #C2C2C2",
};
const buttonstyling = {
  letterSpacing: "2px",
  outline: "none",
  borderRadius: "25px",
  padding: "10px 20px",
  margin: "10px 0",
  cursor: "pointer",
  border: "none",
  fontSize: "18px",
  position: "relative",
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
};

//Component for the add event modal
export default function AddEventModal({
  modal,
  onChange,
  createEvent,
  toggle,
}) {
  return (
    <div>
      <Modal isOpen={modal} className="modal-dialog-centered">
        <ModalHeader toggle={toggle}> Create New Event</ModalHeader>
        <ModalBody>
          <Form className="eventForm" onSubmit={createEvent}>
            <Row>
              <Col>
                <Input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Event name..."
                  onChange={onChange}
                  style={inputstyling}
                />
              </Col>
              <Col>
                <Input
                  type="presenter"
                  name="presenter"
                  id="presenter"
                  placeholder="Presenter name..."
                  onChange={onChange}
                  style={inputstyling}
                />
              </Col>
            </Row>

            <br />
            <Row>
              <Col>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Description..."
                  onChange={onChange}
                  style={inputstyling}
                />
              </Col>
              <br />

              <Col>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  placeholder="Event date..."
                  onChange={onChange}
                  style={inputstyling}
                />
              </Col>
            </Row>
            <br />
            <ModalFooter>
              <Tooltip title="Create new event">
                <Button style={buttonstyling}>Create Event</Button>
              </Tooltip>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
