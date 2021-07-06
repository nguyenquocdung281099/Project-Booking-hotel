import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalPromo(props) {
  let { id, name, discount, startTime, endTime, isOpen, isEdit } = props;
  const initialValues = {
    id, name, discount, startTime, endTime
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
    discount: "*", 
    startTime: "*",
    endTime: "*"
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

  if (values.discount <= 0) {
    dataErrors = { ...dataErrors, discount: "This field must be a positive value" };
  } else {
    dataErrors = { ...dataErrors, discount: "" };
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
                <span id="name_error" style={{ colornpm: "red" }}>
                  {dataError.name}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label for="discount" className="col-sm-3 col-form-label">
                Discount
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={discount}
                  name="discount"
                  type="number"
                  className="form-control"
                  onChange={handleChange}
                />
                <span id="discount_error" style={{ color: "red" }}>
                  {dataError.discount}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label for="startTime" className="col-sm-3 col-form-label">
                Start Date
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={startTime}
                  name="startTime"
                  type="date"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="endTime" className="col-sm-3 col-form-label">
                End Date
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={endTime}
                  name="endTime"
                  type="date"
                  className="form-control"
                  onChange={handleChange}
                />
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
