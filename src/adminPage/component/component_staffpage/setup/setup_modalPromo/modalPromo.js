import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalPromo(props) {
  let { id, name, discount, startTime, endTime, isOpen, isEdit } = props;
  const initialValues = {
    id: id,
    name: name,
    discount: discount,
    startTime: startTime,
    endTime: endTime,
  };
  const [values, setValues] = useState(initialValues);
  console.log("values", values);

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
      <Modal
        show={isOpen}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
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
                ></input>
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
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                ></input>
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
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                ></input>
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
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {isEdit ? (
            <Button variant="primary" onClick={() => props.editPromo(values)}>
              Save
            </Button>
          ) : (
            <Button variant="primary" onClick={() => props.addPromo(values)}>
              Add
            </Button>
          )}
          <Button variant="danger" onClick={() => props.hideModal()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
