import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalRoom(props) {
  let { id, name, idtyperoom, number, pricePerday, description, image, isOpen, isEdit } = props;
  const initialValues = {
    id, name, idtyperoom, number, pricePerday, description
  };
  
  const [values, setValues] = useState(initialValues);

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  const [dataError, setdataError] = useState({
    name: "*",
    idtyperoom: "*",
    number: "*",
    pricePerday: "*",
    description: "*"
  });

  let dataErrors = {};

  useEffect(function () {
    setdataError({ ...dataErrors });
  }, [values])

  if (values.name === "") {
    dataErrors = { ...dataErrors, name: "This field can't be empty" };
  } else {
    dataErrors = { ...dataErrors, name: "" };
  }

  if (values.idtyperoom === "") {
    dataErrors = { ...dataErrors, idtyperoom: "This field can't be empty" };
  } else {
    dataErrors = { ...dataErrors, idtyperoom: "" };
  }

  if (values.number === "") {
    dataErrors = { ...dataErrors, number: "This field can't be empty" };
  } else {
    dataErrors = { ...dataErrors, number: "" };
  }

  if (values.pricePerday <= 0) {
    dataErrors = { ...dataErrors, pricePerday: "This field must be a positive value" };
  } else {
    dataErrors = { ...dataErrors, pricePerday: "" };
  }

  

  if (values.description === "") {
    dataErrors = { ...dataErrors, description: "This field can't be empty" };
  } else {
    dataErrors = { ...dataErrors, description: "" };
  }

  return (
    <>
      <Modal
        show={isOpen}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={props.hideModal}
      >
        <Modal.Header closeButton onHide={props.hideModal}>
          <Modal.Title id="contained-modal-title-vcenter">
            {isEdit ? "Edit" : "Add"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group row">
              <label for="name" className="col-sm-3 col-form-label">
                Name
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={name}
                  name="name"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                />
                <span id="name_error" style={{ color: "red" }}>
                  {dataError.name}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label for="idtyperoom" className="col-sm-3 col-form-label">
                Type Room ID
              </label>
              <div className="col-sm-9">
                <select class="custom-select" onChange={handleChange} value={idtyperoom}>
                  <option hidden>Open this select menu</option>
                  <option value="1" >One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                  <option value="5">Five</option>
                  <option value="6">Six</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label for="number" className="col-sm-3 col-form-label">
                Number
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={number}
                  name="number"
                  type="number"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <span id="number_error" style={{ color: "red" }}>
                {dataError.number}
              </span>
            </div>
            <div className="form-group row">
              <label for="pricePerday" className="col-sm-3 col-form-label">
                Price Per Day
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={pricePerday}
                  name="pricePerday"
                  type="number"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <span id="pricePerday_error" style={{ color: "red" }}>
                {dataError.pricePerday}
              </span>
            </div>
            <div className="form-group row">
              <label for="description" className="col-sm-3 col-form-label">
                Description
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={description}
                  name="description"
                  type="textarea"
                  className="form-control"
                  onChange={handleChange}
                />
                <span id="description_error" style={{ color: "red" }}>
                  {dataError.description}
                </span>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => props.hideModal()}>
            Close
          </Button>
          {isEdit ? (
            <Button variant="primary" onClick={() => props.editData(values)}>
              Save
            </Button>
          ) : (
            <Button variant="primary" onClick={() => props.addData(values)}>
              Add
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
