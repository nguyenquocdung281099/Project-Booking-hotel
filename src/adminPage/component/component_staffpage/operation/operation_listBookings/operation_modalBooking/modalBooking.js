import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalBooking(props) {
  let { id, idroom, idUser, dateStart, dateEnd, codeDiscount, totalCost, status,
    paymethod, number, service, createdAt, updatedAt, userName, isOpen, findRoomName } = props;


  const initialValues = {
    id, idroom, idUser, dateStart, dateEnd, codeDiscount, totalCost, status,
    paymethod, number, service, createdAt, updatedAt, userName
  };

  let rName = findRoomName(idroom)

  const [values, setValues] = useState(initialValues);

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  const [dataError, setdataError] = useState({
    status: "*",
    dateStart: "*",
  })

  let dayS = new Date(dateStart)
  let dateS = `${dayS.getDate()}/${dayS.getMonth() + 1}/${dayS.getFullYear()}`
  let dayE = new Date(dateEnd)
  let dateE = `${dayE.getDate()}/${dayE.getMonth() + 1}/${dayE.getFullYear()}`

  function handleSubmit(data) {
    let dataErrors = {};

    if (data.status === "" || !data.status) {
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
              <label for="roomNumber" className="col-sm-3 col-form-label">
                Room Number
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={rName}
                  name="roomNumber"
                  type="text"
                  className="form-control"
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="number" className="col-sm-3 col-form-label">
                Number of people
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={number}
                  name="number"
                  type="text"
                  className="form-control"
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="dateStart" className="col-sm-3 col-form-label">
                Date Start
              </label>
              <div className="col-sm-9">
                <input
                  name="dateStart"
                  type="text"
                  className="form-control"
                  defaultValue={dateS}
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="dateEnd" className="col-sm-3 col-form-label">
                Date End
              </label>
              <div className="col-sm-9">
                <input
                  name="dateEnd"
                  type="text"
                  className="form-control"
                  defaultValue={dateE}
                  disabled
                />
              </div>
            </div>

            {values.service.length !== 0 || values.service !== null ?
              values.service.map((eitem, eindex) => {
                return (
                  <div className="form-group row">
                    <label for={`eservice-${eindex + 1}`} className="col-sm-3 col-form-label">
                      Service {eindex + 1}
                    </label>
                    <div className="col-sm-7">
                      <input
                        name={`eservice-name-${eindex + 1}`}
                        type="text"
                        className="form-control"
                        defaultValue={eitem.name}
                        disabled
                      />
                    </div>
                    <div className="col-sm-2">
                      <input
                        name={`eservice-price-${eindex + 1}`}
                        type="text"
                        className="form-control"
                        defaultValue={`$ ${eitem.price}`}
                        disabled
                      />
                    </div>
                  </div>)
              })

              : ("")}
            <div className="form-group row">
              <label for="totalCost" className="col-sm-3 col-form-label">
                Total Cost
              </label>
              <div className="col-sm-9">
                <input
                  name="totalCost"
                  type="text"
                  className="form-control"
                  defaultValue={`$ ${totalCost}`}
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="codeDiscount" className="col-sm-3 col-form-label">
                Code Discount
              </label>
              <div className="col-sm-9">
                <input
                  name="codeDiscount"
                  type="text"
                  className="form-control"
                  defaultValue={codeDiscount}
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="paymethod" className="col-sm-3 col-form-label">
                Pay Method
              </label>
              <div className="col-sm-9">
                <input
                  name="paymethod"
                  type="text"
                  className="form-control"
                  defaultValue={paymethod}
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
          <Button variant="primary" className='mred' onClick={() => handleSubmit(values)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
