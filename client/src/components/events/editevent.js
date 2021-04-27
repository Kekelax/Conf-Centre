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

// Component to edit an event - allows the user to update the presenter and date
export default function EditEventModal({
  modal,
  onChange,
  updateEvent,
  toggle,
}) {
  return (
    <div>
      <Modal isOpen={modal} className="modal-dialog-centered">
        <ModalHeader toggle={toggle}> Edit Event</ModalHeader>
        <ModalBody>
          <Form onSubmit={updateEvent}>
            <Row>
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
            <ModalFooter>
              <Tooltip title="Updates event">
                <Button style={buttonstyling}>Update</Button>
              </Tooltip>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
