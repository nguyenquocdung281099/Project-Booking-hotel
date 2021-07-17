import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalBooking(props) {
  let { id, idroom, userID, starttime, endtime, promoId, totalCost,
    userName, status, paymethod, isOpen } = props;

  const initialValues = {
    id, idroom, userID, starttime, endtime, promoId, totalCost,
    userName, status, paymethod
  };
  
  const [values, setValues] = useState(initialValues);

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  const [dataError, setdataError] = useState({
    status: "*",
  });

  function handleSubmit(data) {
    let dataErrors = {};

    if (data.status=== "" || !data.status) {
      dataErrors = { ...dataErrors, status: "This field can't be empty" };
    } else {
      delete dataErrors.status;
    }

    setdataError({ ...dataErrors });

    if (Object.keys(dataErrors).length === 0) {
        props.editData(data)
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
            Info Booking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group row">
              <label for="id" className="col-sm-3 col-form-label">
                ID
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={id}
                  name="id"
                  type="text"
                  className="form-control"
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="userID" className="col-sm-3 col-form-label">
                User ID
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={userID}
                  name="userID"
                  type="text"
                  className="form-control"
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="userName" className="col-sm-3 col-form-label">
                User Name
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={userName}
                  name="userName"
                  type="text"
                  className="form-control"
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="starttime" className="col-sm-3 col-form-label">
                Start Time
              </label>
              <div className="col-sm-9">
                <input
                  name="starttime"
                  type="date"
                  className="form-control"
                  defaultValue={starttime}
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="endtime" className="col-sm-3 col-form-label">
                End Time
              </label>
              <div className="col-sm-9">
                <input
                  name="endtime"
                  type="date"
                  className="form-control"
                  defaultValue={endtime}
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="promoId" className="col-sm-3 col-form-label">
                Promo ID
              </label>
              <div className="col-sm-9">
                <input
                  name="promoId"
                  type="text"
                  className="form-control"
                  defaultValue={promoId}
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="idpay" className="col-sm-3 col-form-label">
                Pay Method
              </label>
              <div className="col-sm-9">
                <input
                  name="idpay"
                  type="text"
                  className="form-control"
                  defaultValue={paymethod? paymethod.idpaymethod:""}
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="statuspay" className="col-sm-3 col-form-label">
                Status Pay
              </label>
              <div className="col-sm-9">
                <input
                  name="statuspay"
                  type="text"
                  className="form-control"
                  defaultValue={paymethod? paymethod.status:""}
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="status" className="col-sm-3 col-form-label">
                Status
              </label>
              <div className="col-sm-9">
                <select
                  className="form-control"
                  name="status"
                  onChange={handleChange}
                  value={values.status}>
                  <option hidden>Select Status</option>
                  <option value="NEW">NEW</option>
                  <option value="CANCEL">CANCELLED</option>
                  <option value="LIVEIN">LIVEIN</option>
                  <option value="CHECKED OUT">CHECKED OUT</option>
                </select>
                <span id="status_error" style={{ color: "red" }}>
                  {dataError.status}
                </span>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => props.hideModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit(values)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
