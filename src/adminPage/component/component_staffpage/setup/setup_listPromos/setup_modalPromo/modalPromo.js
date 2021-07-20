import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from 'react-redux'

export default function ModalPromo(props) {
  let { id, name, discount, code, amount, expiryDate, createdAt,
    updatedAt, isOpen, isEdit } = props;

  const initialValues = {
    id, name, discount, code, amount, expiryDate, createdAt,
    updatedAt
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
      case 'expiryDate':
        let temp = new Date(e.target.value).toString()
        setValues({
          ...values,
          [e.target.name]: temp
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

  const promoModal = useSelector((state) => state.promo.promo)

  const [dataError, setdataError] = useState({
    name: "*",
    discount: "*",
    code: "*",
    amount: "*",
    expiryDate: "*"
  });

  let eDay = new Date(expiryDate).toISOString().substr(0, 10)
  let today = new Date().toISOString().substr(0, 10)

  function handleSubmit(data) {

    let dataErrors = {};

    if (data.name === "" || !data.name) {
      dataErrors = { ...dataErrors, name: "This field can't be empty" };
    } else {
      if (promoModal.findIndex((item) => item.name === data.name) !== -1 && isEdit !== true) {
        dataErrors = {
          ...dataErrors,
          name: ("This promo name is already in used"),
        };
      } else {
        delete dataErrors.name;
      }
    }

    if (data.discount <= 0 || !data.discount) {
      dataErrors = { ...dataErrors, discount: "This field must be a positive value" };
    } else {
      delete dataErrors.discount;
    }

    if (data.code === "" || !data.code) {
      dataErrors = { ...dataErrors, code: "This field can't be empty" };
    } else {
      if (promoModal.findIndex((item) => item.code === data.code) !== -1 && isEdit !== true) {
        dataErrors = {
          ...dataErrors,
          code: ("This promo code name is already in used"),
        };
      } else {
        delete dataErrors.code;
      }
    }

    if (data.amount <= 0 || !data.amount) {
      dataErrors = { ...dataErrors, amount: "This field must be a positive value" };
    } else {
      delete dataErrors.amount;
    }

    if (data.expiryDate === "" || !data.expiryDate) {
      dataErrors = { ...dataErrors, expiryDate: "Please choose an expire date" };
    } else {
      delete dataErrors.expiryDate;
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
                  placeholder='Please fillout name promo'
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
                  placeholder='Please fillout value of discount'
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
                  placeholder='Please fillout name of promo code'
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
                  placeholder='Please fillout amount of promo code'
                />
                <span id="amount_error" style={{ color: "red" }}>
                  {dataError.amount}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label for="expiryDate" className="col-sm-3 col-form-label">
                Expiry Date
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={isEdit ? eDay : today}
                  name="expiryDate"
                  type="date"
                  className="form-control"
                  onChange={handleChange}
                  placeholder='Please choose expiry date'
                  min={today}
                />
                <span id="expiryDate_error" style={{ color: "red" }}>
                  {dataError.expiryDate}
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
