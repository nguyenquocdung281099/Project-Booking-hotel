import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalUser(props) {
  let { id, name, idRole, userName, birthday, email, address, isOpen, isEdit } = props;
  const initialValues = {
    id, name, idRole, userName, birthday, email, address
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
    idRole: "*",
    userName: "*",
    birthday: "*",
    email: "*",
    address: "*",
  });

  function handleSubmit(data) {

    let dataErrors = {};

    if (data.name === "" || !data.name) {
      dataErrors = { ...dataErrors, name: "This field can't be empty" };
    } else {
      delete dataErrors.name;
    }

    if (!data.idRole) {
      dataErrors = { ...dataErrors,idRole: "This field can't be empty" };
    } else {
      delete dataErrors.idRole;
    }

    if (data.userName === "" || !data.userName) {
      dataErrors = { ...dataErrors, userName: "This field can't be empty" };
    } else {
      delete dataErrors.userName;
    }

    if (!data.birthday) {
      dataErrors = { ...dataErrors, birthday: "This field can't be empty" };
    } else {
      delete dataErrors.birthday
    }

    if (data.email === "" || !data.email) {
      dataErrors = { ...dataErrors, email: "This field can't be empty" };
    } else {
      const emailno =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!emailno.test(data.email)) {
        dataErrors = { ...dataErrors, email: "Please input valid format email" };
      } else {
        delete dataErrors.email;
      }
    }

    if (data.address === "" || !data.address) {
      dataErrors = { ...dataErrors, address: "This field can't be empty" };
    } else {
      delete dataErrors.address;
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
              <label for="idRole" className="col-sm-3 col-form-label">
                Role
              </label>
              <div className="col-sm-9">
                <select
                  className="form-control"
                  name="idRole"
                  onChange={handleChange}
                  defaultValue={idRole}
                  value={values.idRole}>
                  <option hidden>Select Role</option>
                  <option value="1">Customer</option>
                  <option value="2">Sale</option>
                  <option value="3">Manager</option>
                  <option value="4">Admin</option>
                </select>
                <span id="idRole_error" style={{ color: "red" }}>
                  {dataError.idRole}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label for="userName" className="col-sm-3 col-form-label">
                User Name
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={name}
                  name="userName"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                />
                <span id="userName_error" style={{ color: "red" }}>
                  {dataError.userName}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label for="birthday" className="col-sm-3 col-form-label">
                Birthday
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={birthday}
                  name="birthday"
                  type="date"
                  className="form-control"
                  onChange={handleChange}
                />
                 <span id="birthday_error" style={{ color: "red" }}>
                  {dataError.birthday}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label for="email" className="col-sm-3 col-form-label">
                Email
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={email}
                  name="email"
                  type="email"
                  className="form-control"
                  onChange={handleChange}
                />
                 <span id="email_error" style={{ color: "red" }}>
                  {dataError.email}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label for="address" className="col-sm-3 col-form-label">
                Address
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={address}
                  name="address"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                />
                <span id="address_error" style={{ color: "red" }}>
                  {dataError.address}
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
