import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalService(props) {
  let { id, name, price, isOpen, isEdit } = props;
  const initialValues = {
    id, name, price
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
    price: "*"
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

  if (values.price <= 0) {
    dataErrors = { ...dataErrors, price: "This field must be a positive value" };
  } else {
    dataErrors = { ...dataErrors, price: "" };
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
              <label for="discount" className="col-sm-3 col-form-label">
                Price
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={price}
                  name="price"
                  type="number"
                  className="form-control"
                  onChange={handleChange}
                />
                <span id="price_error" style={{ color: "red" }}>
                  {dataError.price}
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
