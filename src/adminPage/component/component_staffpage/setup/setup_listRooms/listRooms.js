import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import "antd/dist/antd.css";
import { Pagination } from "antd";
import ItemRoom from './itemRoom/itemRoom'
import { addRoom, delRoom, editRoom, getroom } from '../../../../../redux/action/';
import ModalRoom from './setup_modalRoom/modalRoom';

export default function ListRooms() {
  const roomData = useSelector((state) => state.room)
  // const loader = useSelector((state) => state.room.loader)
  const filter = roomData.filter;
  const dispatch = useDispatch()
  const pagi =
    Object.keys(roomData.pagi).length === 0
      ? {
        _page: 1,
        _limit: 15,
        _totalRows: 15,
      }
      : roomData.pagi;

  useEffect(() => {
    dispatch(getroom({ _page: pagi._page, _limit: pagi._limit }));
  }, []);

  useEffect(() => {
    dispatch(getroom({ ...filter, _page: pagi._page, _limit: pagi._limit }));
  }, [filter]);

  function handleChangePagi(page, pagesize) {
    dispatch(getroom({ ...filter, _page: page, _limit: pagi._limit }));
    window.screenY = 0;
  }

  const [modalStatus, setModalStatus] = useState({
    isOpen: false,
    isEdit: false,
    id: null,
    name: null,
    idtyperoom: null,
    number: null,
    pricePerday: null,
    description: null
  })

  function addData(data) {
    let item = {
      name: data.name,
      idtyperoom: +data.idtyperoom,
      number: +data.number,
      pricePerday: +data.pricePerday,
      description: data.description
    }
    dispatch(addRoom(item))
    hideModal()
  }

  function editData(data) {
    let updateData = roomData.rooms.find(item => item.id === data.id)
    updateData = data
    dispatch(editRoom(updateData))
    hideModal()
  }

  function deleteData(id) {
    dispatch(delRoom(id))
  }

  const showModal = (i, a) => {
    let newState = { ...modalStatus }
    let data = roomData.rooms.find(item => {
      return item.id === a
    })
    newState = { ...newState, isOpen: true, isEdit: i, ...data }
    setModalStatus(newState)
  };

  const hideModal = () => {
    let newState = { ...modalStatus }
    let data = {
      id: null,
      name: null,
      idtyperoom: null,
      number: null,
      pricePerday: null,
      description: null
    }
    newState = { ...newState, isOpen: false, isEdit: null, ...data };
    setModalStatus(newState)
  };

  const datas = roomData.rooms.map((item, index) => {
    return <ItemRoom key={index} index={index} {...item}
      deleteData={deleteData}
      showModal={showModal} />
  })

  return (
    <div>
      <button type="button" class="btn btn-primary" onClick={() => showModal(false, null)}>Add Room</button>
      <Pagination
        defaultCurrent={pagi._page}
        total={pagi._totalRows}
        pageSize={pagi._limit}
        onChange={handleChangePagi}
      />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Number</th>
            <th scope="col">Rating</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {datas}
          {/* <td colSpan="6"><div style={{ display: loader }} className="lds-dual-ring"></div></td> */}
        </tbody>
      </table>
      
      < ModalRoom
        key={modalStatus.id}
        {...modalStatus}
        addData={addData}
        editData={editData}
        hideModal={hideModal}
      />
    </div>
  )
}