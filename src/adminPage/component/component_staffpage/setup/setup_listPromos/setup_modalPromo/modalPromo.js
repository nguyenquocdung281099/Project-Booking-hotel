import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalPromo(props) {
  let { id, name, discount, code, amount, isOpen, isEdit } = props;
  const initialValues = {
    id, name, discount, code, amount
  };
  const [values, setValues] = useState(initialValues);

  function handleChange(e) {
    switch (e.target.name) {
      case 'discount':
      case 'amount':
        setValues({
          ...values,
          [e.target.name]: +e.target.value,
        });
        break;
      default:
        setValues({
          ...values,
          [e.target.name]: e.target.value,
        });
        break;
    }
  }

  const [dataError, setdataError] = useState({
    name: "*",
    discount: "*",
    code: "*",
    amount: "*"
  });

  function handleSubmit(data) {

    let dataErrors = {};

    if (data.name === "" || !data.name) {
      dataErrors = { ...dataErrors, name: "This field can't be empty" };
    } else {
      delete dataErrors.name;
    }

    if (data.discount <= 0 || !data.discount) {
      dataErrors = { ...dataErrors, discount: "This field can't be empty" };
    } else {
      delete dataErrors.discount;
    }

    if (data.code === "" || !data.code) {
      dataErrors = { ...dataErrors, code: "This field can't be empty" };
    } else {
      delete dataErrors.code;
    }

    if (data.amount <= 0 || !data.amount) {
      dataErrors = { ...dataErrors, amount: "This field can't be empty" };
    } else {
      delete dataErrors.amount;
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
                />
                <span id="name_error" style={{ color: "red" }}>
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
              <label for="code" className="col-sm-3 col-form-label">
                Code
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={code}
                  name="code"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                />
                <span id="code_error" style={{ color: "red" }}>
                  {dataError.code}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label for="amount" className="col-sm-3 col-form-label">
                Amount
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={amount}
                  name="amount"
                  type="number"
                  className="form-control"
                  onChange={handleChange}
                />
                <span id="amount_error" style={{ color: "red" }}>
                  {dataError.amount}
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
