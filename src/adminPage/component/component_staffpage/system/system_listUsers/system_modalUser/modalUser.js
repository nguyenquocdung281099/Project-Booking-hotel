import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ModalUser(props) {
  let {
    id,
    name,
    idRole,
    birthday,
    email,
    address,
    phone,
    createdAt,
    updatedAt,
    isOpen,
    isEdit,
  } = props;
  const initialValues = {
    id,
    name,
    idRole,
    birthday,
    email,
    address,
    phone,
    createdAt,
    updatedAt,
  };
  const [values, setValues] = useState(initialValues);

  function handleChange(e) {
    switch (e.target.name) {
      case "birthday":
        setValues({
          ...values,
          [e.target.name]: e.target.value,
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
  const userModal = useSelector((state) => state.userDB.userDB);

  const [dataError, setdataError] = useState({
    name: "*",
    idRole: "*",
    birthday: "*",
    email: "*",
    address: "*",
    phone: "*",
  });

  let bDay = new Date(birthday).toISOString().substr(0, 10);
  let today = new Date().toISOString().substr(0, 10);

  function handleSubmit(data) {
    let dataErrors = {};

    if (data.name === "" || !data.name) {
      dataErrors = { ...dataErrors, name: "This field can't be empty." };
    } else {
      delete dataErrors.name;
    }

    if (!data.idRole) {
      dataErrors = { ...dataErrors, idRole: "This field can't be empty" };
    } else {
      delete dataErrors.idRole;
    }

    if (!data.birthday) {
      dataErrors = { ...dataErrors, birthday: "Please choose a birthday" };
    } else {
      delete dataErrors.birthday;
    }

    if (data.email === "" || !data.email) {
      dataErrors = { ...dataErrors, email: "This field can't be empty" };
    } else {
      const emailno =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!emailno.test(data.email)) {
        dataErrors = {
          ...dataErrors,
          email: "Please input valid format email",
        };
      } else {
        if (
          userModal.findIndex((item) => item.email === data.email) !== -1 &&
          isEdit !== true
        ) {
          dataErrors = {
            ...dataErrors,
            email: "This email is already in used",
          };
        } else {
          delete dataErrors.email;
        }
      }
    }

    if (data.address === "" || !data.address) {
      dataErrors = { ...dataErrors, address: "This field can't be empty" };
    } else {
      delete dataErrors.address;
    }

    if (data.phone === "" || !data.phone) {
      dataErrors = {
        ...dataErrors,
        phone: "Please fill out your phone number",
      };
    } else {
      const phoneno = /^\d{10}$/;
      if (!phoneno.test(data.phone)) {
        dataErrors = {
          ...dataErrors,
          phone: "Please format your phone number",
        };
      } else {
        delete dataErrors.phone;
      }
    }

    setdataError({ ...dataErrors });

    if (Object.keys(dataErrors).length === 0) {
      if (isEdit) {
        props.editData(data);
      } else {
        props.addData(data);
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
                  placeholder="Please fill out name of user"
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
                  value={values.idRole}
                >
                  <option hidden>Please choose role</option>
                  <option value="user1">Customer</option>
                  <option value="user4">Sale</option>
                  <option value="user3">Manager</option>
                  <option value="user2">Admin</option>
                </select>
                <span id="idRole_error" style={{ color: "red" }}>
                  {dataError.idRole}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label for="birthday" className="col-sm-3 col-form-label">
                Birthday
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={bDay}
                  name="birthday"
                  type="date"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Please choose a birthday"
                  max={today}
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
                  placeholder="Please input an email"
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
                  placeholder="Please input an address"
                />
                <span id="address_error" style={{ color: "red" }}>
                  {dataError.address}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label for="phone" className="col-sm-3 col-form-label">
                Phone
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={phone}
                  name="phone"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Please fill out your phone number"
                />
                <span id="phone_error" style={{ color: "red" }}>
                  {dataError.phone}
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
