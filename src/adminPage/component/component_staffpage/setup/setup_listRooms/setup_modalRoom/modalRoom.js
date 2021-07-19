import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { getRoomModal } from '../../../../../../redux/action';

export default function ModalRoom(props) {
  let { id, name, idtyperoom, number, pricePerday, description, image, isOpen, isEdit } = props;

  const dispatch = useDispatch()
  const initialValues = {
    id, name, idtyperoom, number, pricePerday, description, image
  };

  const roomModal = useSelector((state) => state.roomDB.modal)
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    dispatch(getRoomModal())
    // eslint-disable-next-line
  }, [])

  function handleChange(e) {
    switch (e.target.name) {
      case 'name':
      case 'idtyperoom':
      case 'number':
      case 'pricePerday':
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

  function handleChangeImage(e) {
    let i = null
    switch (e.target.name) {
      case 'image0':
        i = 0
        break;
      case 'image1':
        i = 1
        break;
      case 'image2':
        i = 2
        break;
      case 'image3':
        i = 3
        break;
      case 'image4':
        i = 4
        break;
      default:
        break;
    }
    image[i] = e.target.value
  }

  const [dataError, setdataError] = useState({
    name: "*",
    idtyperoom: "*",
    number: "*",
    pricePerday: "*",
    description: "*",
    image0: "*", image1: "*", image2: "*", image3: "*", image4: "*",
  });

  function handleSubmit(data) {

    let dataErrors = {};

    if (data.name === "" || !data.name) {
      dataErrors = { ...dataErrors, name: "This field can't be empty and can only contain numbers" };
    } else {
      if (roomModal.findIndex((item) => item.name === +data.name && isEdit !== true) !== -1) {
        dataErrors = {
          ...dataErrors,
          name: ("This room name is already in used"),
        };
      } else {
        delete dataErrors.name;
      }
    }
    
    if (data.idtyperoom === "" || !data.idtyperoom) {
      dataErrors = { ...dataErrors, idtyperoom: "This field can't be empty" };
    } else {
      delete dataErrors.idtyperoom;
    }

    if (data.number <= 0 || !data.number) {
      dataErrors = { ...dataErrors, number: "This field must be a positive value" };
    } else {
      delete dataErrors.number
    }

    if (data.pricePerday <= 0 || !data.pricePerday) {
      dataErrors = { ...dataErrors, pricePerday: "This field must be a positive value" };
    } else {
      delete dataErrors.pricePerday
    }

    if (data.description === "" || !data.description) {
      dataErrors = { ...dataErrors, description: "This field can't be empty" };
    } else {
      delete dataErrors.description
    }
    const regeximage = new RegExp('^https?://(?:[a-z0-9-]+.)+[a-z]{2,6}(?:/[^/#?]+)+.(?:jpg|gif|png)$', 'i')

    if (data.image[0] === "" || !data.image[0]) {
      dataErrors = { ...dataErrors, image0: "This field can't be empty" };
    } else {
      if (!regeximage.test(data.image[0])) {
        dataErrors = { ...dataErrors, image0: "Please input valid format image url" };
      } else {
        delete dataErrors.image0
      }
    }

    if (data.image[1] === "" || !data.image[1]) {
      dataErrors = { ...dataErrors, image1: "This field can't be empty" };
    } else {
      if (!regeximage.test(data.image[1])) {
        dataErrors = { ...dataErrors, image1: "Please input valid format image url" };
      } else {
        delete dataErrors.image1
      }
    }

    if (data.image[2] === "" || !data.image[2]) {
      dataErrors = { ...dataErrors, image2: "This field can't be empty" };
    } else {
      if (!regeximage.test(data.image[2])) {
        dataErrors = { ...dataErrors, image2: "Please input valid format image url" };
      } else {
        delete dataErrors.image2
      }
    }

    if (data.image[3] === "" || !data.image[3]) {
      dataErrors = { ...dataErrors, image3: "This field can't be empty" };
    } else {
      if (!regeximage.test(data.image[3])) {
        dataErrors = { ...dataErrors, image3: "Please input valid format image url" };
      } else {
        delete dataErrors.image3
      }
    }

    if (data.image[4] === "" || !data.image[4]) {
      dataErrors = { ...dataErrors, image4: "This field can't be empty" };
    } else {
      if (!regeximage.test(data.image[4])) {
        dataErrors = { ...dataErrors, image4: "Please input valid format image url" };
      } else {
        delete dataErrors.image4
      }
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
                  placeholder='Please fillout name of room'
                />
                <span id="name_error" style={{ color: "red" }}>
                  {dataError.name}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label for="idtyperoom" className="col-sm-3 col-form-label">
                Room Type
              </label>
              <div className="col-sm-9">
                <select
                  className="form-control"
                  name="idtyperoom"
                  onChange={handleChange}
                  value={+values.idtyperoom}>
                  <option hidden>Please choose type of room</option>
                  <option value="1">Classic Room</option>
                  <option value="2">Budget Room</option>
                  <option value="3">Single Room</option>
                  <option value="4">Royal Suite Room</option>
                  <option value="5">Luxury Room</option>
                  <option value="6">Premium Room</option>
                </select>
                <span id="idtyperoom_error" style={{ color: "red" }}>
                  {dataError.idtyperoom}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label for="number" className="col-sm-3 col-form-label">
                Number of People
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={number}
                  name="number"
                  type="number"
                  className="form-control"
                  onChange={handleChange}
                  placeholder='Please fillout number of people'
                />
                <span id="number_error" style={{ color: "red" }}>
                  {dataError.number}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label for="pricePerday" className="col-sm-3 col-form-label">
                Price Per Day
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={pricePerday}
                  name="pricePerday"
                  type="number"
                  className="form-control"
                  onChange={handleChange}
                  placeholder='Please fillout price per day of room'
                />
                <span id="pricePerday_error" style={{ color: "red" }}>
                  {dataError.pricePerday}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label for="description" className="col-sm-3 col-form-label">
                Description
              </label>
              <div className="col-sm-9">
                <textarea
                  defaultValue={description}
                  name="description"
                  type="textarea"
                  className="form-control"
                  rows="4"
                  onChange={handleChange}
                  placeholder='Please fillout description of room'
                />
                <span id="description_error" style={{ color: "red" }}>
                  {dataError.description}
                </span>
              </div>
            </div>
            <div className="form-group row">

              <label for="image0" className="col-sm-3 col-form-label">
                Image 1
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={image[0]}
                  name="image0"
                  type="text"
                  className="form-control"
                  onChange={handleChangeImage}
                  placeholder='Please fillout link of image'
                />
                <span id="image0_error" style={{ color: "red" }}>
                  {dataError.image0}
                </span>
              </div>

              <label for="image1" className="col-sm-3 col-form-label">
                Image 2
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={image[1]}
                  name="image1"
                  type="text"
                  className="form-control"
                  onChange={handleChangeImage}
                  placeholder='Please fillout link of image'
                />
                <span id="image_error" style={{ color: "red" }}>
                  {dataError.image1}
                </span>
              </div>

              <label for="image1" className="col-sm-3 col-form-label">
                Image 3
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={image[2]}
                  name="image2"
                  type="text"
                  className="form-control"
                  onChange={handleChangeImage}
                  placeholder='Please fillout link of image'
                />
                <span id="image2_error" style={{ color: "red" }}>
                  {dataError.image2}
                </span>
              </div>

              <label for="image3" className="col-sm-3 col-form-label">
                Image 4
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={image[3]}
                  name="image3"
                  type="text"
                  className="form-control"
                  onChange={handleChangeImage}
                  placeholder='Please fillout link of image'
                />
                <span id="image3_error" style={{ color: "red" }}>
                  {dataError.image3}
                </span>
              </div>

              <label for="image4" className="col-sm-3 col-form-label">
                Image 5
              </label>
              <div className="col-sm-9">
                <input
                  defaultValue={image[4]}
                  name="image4"
                  type="text"
                  className="form-control"
                  onChange={handleChangeImage}
                  placeholder='Please fillout link of image'
                />
                <span id="image4_error" style={{ color: "red" }}>
                  {dataError.image4}
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
