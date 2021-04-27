import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
} from "reactstrap";

//Material UI
import Tooltip from "@material-ui/core/Tooltip";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

//styling
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

//Component to edit the user
export default function EditUser({
  modal,
  updateUser,
  onChange,
  toggle,
  accessrights,
}) {
  const classes = useStyles();
  return (
    <div>
      <Modal isOpen={modal} className="modal-dialog-centered">
        <ModalHeader toggle={toggle}> Edit User</ModalHeader>
        <ModalBody>
          <Form onSubmit={updateUser}>
            <Row>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                  Super User?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={onChange}
                  label="super_user"
                  name="super_user"
                  value={accessrights}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
                <FormHelperText>Please select an option</FormHelperText>
              </FormControl>
            </Row>
            <ModalFooter>
              <Tooltip title="Updates user">
                <Button style={buttonstyling}>Update</Button>
              </Tooltip>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
