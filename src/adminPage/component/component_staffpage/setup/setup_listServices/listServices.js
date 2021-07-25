import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import ItemService from "./itemService/itemService";
import {
  addService,
  delService,
  editService,
  getservice,
  getBookingDB,
} from "../../../../../redux/action/";
import ModalService from "./setup_modalService/modalService";
import SortService from "./setup_sortService/sortService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalDelete from "../../modalRSUDelete/modalDelete";

export default function ListServices() {
  const dispatch = useDispatch();
  const serviceData = useSelector((state) => state.service);
  const loader = useSelector((state) => state.service.loader);
  const filter = serviceData.filter;

  const bookSModal = useSelector((state) => state.bookingDB.bookingDB);

  const pagi =
    Object.keys(serviceData.pagi).length === 0
      ? {
          _page: 1,
          _limit: 14,
          _totalRows: 12,
        }
      : serviceData.pagi;

  useEffect(() => {
    dispatch(getservice({ _page: pagi._page, _limit: pagi._limit }));
    dispatch(getBookingDB({}));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getservice({ ...filter, _page: pagi._page, _limit: pagi._limit }));
  }, [filter, dispatch, pagi._page, pagi._limit]);

  function handleChangePagi(page, pagesize) {
    dispatch(getservice({ ...filter, _page: page, _limit: pagi._limit }));
    window.screenY = 0;
  }

  const [modalStatus, setModalStatus] = useState({
    isOpen: false,
    isEdit: false,
    id: null,
    name: null,
    price: null,
    createdAt: null,
    updatedAt: null,
  });

  const [modalDelStatus, setModalDelStatus] = useState({
    isOpen: false,
    id: null,
  });

  const toaster = (data) => {
    switch (data) {
      case "ADD":
        return toast.success("Add Success!");
      case "EDIT":
        return toast.success("Edit Success!");
      case "DELETE":
        return toast.success("Delete Success!");
      default:
        return toast.success("Edit Success!");
    }
  };

  function addData(data) {
    let item = {
      name: data.name,
      price: +data.price,
    };
    dispatch(addService(item));
    hideModal();
    toaster("ADD");
  }

  function editData(data) {
    let updateData = serviceData.service.find((item) => item.id === data.id);
    updateData = data;
    updateData.updatedAt = +Date.now();
    dispatch(editService(updateData));
    hideModal();
    toaster("EDIT");
  }

  function deleteData(id) {
    dispatch(delService(id));
    toaster("DELETE");
  }

  const showModal = (i, a) => {
    let newState = { ...modalStatus };
    let data = serviceData.service.find((item) => {
      return item.id === a;
    });
    newState = { ...newState, isOpen: true, isEdit: i, ...data };
    setModalStatus(newState);
  };

  const hideModal = () => {
    let newState = { ...modalStatus };
    let data = {
      id: null,
      name: null,
      price: null,
      createdAt: null,
      updatedAt: null,
    };
    newState = { ...newState, isOpen: false, isEdit: null, ...data };
    setModalStatus(newState);
  };

  const showModalDel = (i, a) => {
    let newState = { ...modalDelStatus };
    newState = { ...newState, isOpen: i, id: a };
    setModalDelStatus(newState);
  };

  const hideModalDel = () => {
    setModalDelStatus({ isOpen: false, id: null });
  };

  const deleteConfirm = (data) => {
    hideModalDel();
    deleteData(data);
  };

  const findUsing = (data) => {
    let temp = [];
    bookSModal
      ? bookSModal
          .filter(
            (item) =>
              item.hasOwnProperty("service") &&
              item.service.length !== 0 &&
              typeof item.service !== "undefined" &&
              item.service !== null
          )
          .forEach((item) =>
            item.service.forEach((sitem) => (temp[temp.length] = sitem.id))
          )
      : (temp = []);
    let obj = temp ? temp.findIndex((element) => element === data) : -1;
    return obj !== -1 ? obj : -1;
  };

  const datas = serviceData.service.map((item, index) => {
    return (
      <ItemService
        key={index}
        index={index}
        {...item}
        showModalDel={showModalDel}
        showModal={showModal}
      />
    );
  });

  return (
    <div className="setup_content content">
      <ToastContainer />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th colSpan="1" className="add-th">
              <div className="form-inline add-inline">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => showModal(false, null)}
                >
                  <i class="fas fa-plus-circle"></i> Add Service
                </button>
              </div>
            </th>
            <th colSpan="3" className="add-th">
              <SortService />
            </th>
          </tr>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {loader ? (
          <tbody>
            <tr>
              <th colSpan="4" className="add-th">
                <div className="lds-dual-ring"></div>
              </th>
            </tr>
          </tbody>
        ) : (
          <tbody>{datas}</tbody>
        )}
      </table>

      <Pagination
        defaultCurrent={pagi._page}
        total={pagi._totalRows}
        pageSize={pagi._limit}
        onChange={handleChangePagi}
      />

      <ModalService
        key={modalStatus.id}
        {...modalStatus}
        addData={addData}
        editData={editData}
        hideModal={hideModal}
      />

      <ModalDelete
        key={`${modalDelStatus.id}_sdel`}
        {...modalDelStatus}
        hideModalDel={hideModalDel}
        deleteConfirm={deleteConfirm}
        findUsing={findUsing}
      />
    </div>
  );
}
