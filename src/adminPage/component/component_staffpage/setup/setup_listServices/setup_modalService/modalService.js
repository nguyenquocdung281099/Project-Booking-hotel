import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from 'react-redux'

export default function ModalService(props) {
  let { id, name, price, createdAt, updatedAt, isOpen, isEdit } = props;
  const initialValues = {
    id, name, price, createdAt, updatedAt
  };
  const [values, setValues] = useState(initialValues);

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  const serviceModal = useSelector((state) => state.service.service)

  const [dataError, setdataError] = useState({
    name: "*",
    price: "*"
  });

  function handleSubmit(data) {

    let dataErrors = {};

    if (data.name === "" || !data.name) {
      dataErrors = { ...dataErrors, name: "This field can't be empty" };
    } else {
      if (serviceModal.findIndex((item) => item.name === data.name) !== -1 && isEdit !== true) {
        dataErrors = {
          ...dataErrors,
          name: ("This service name is already in used"),
        };
      } else {
        delete dataErrors.name;
      }
    }

    if (data.price <= 0 || !data.price) {
      dataErrors = { ...dataErrors, price: "This field must be a positive value" };
    } else {
      delete dataErrors.price
    }

    setdataError({ ...dataErrors });

    if (Object.keys(dataErrors).length === 0) {
      if (isEdit) {
        props.editData(data)
      } else {
        props.addData(data)
      }
    }
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
                  placeholder='Please fillout name of service'
                />
                <span id="name_error" style={{ color: "red" }}>
                  {dataError.name}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label for="discount" className="col-sm-3 col-form-label">
                Price ($)
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={price}
                  name="price"
                  type="number"
                  className="form-control"
                  onChange={handleChange}
                  placeholder='Please fillout price of service'
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
            <Button variant="primary" onClick={() => handleSubmit(values)}>
              Save
            </Button>
          ) : (
            <Button variant="primary" onClick={() => handleSubmit(values)}>
              Add
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
