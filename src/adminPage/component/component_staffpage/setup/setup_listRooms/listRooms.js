import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import "antd/dist/antd.css";
import { Pagination } from "antd";
import ItemRoom from './itemRoom/itemRoom'
import { addRoom, delRoom, editRoom, getroom } from '../../../../../redux/action/';
import ModalRoom from './setup_modalRoom/modalRoom';
import SortRoom from './setup_sortRoom/sortRoom';

export default function ListRooms() {

  const dispatch = useDispatch()
  const roomData = useSelector((state) => state.room)
  const loader = useSelector((state) => state.room.loader)
  const filter = roomData.filter;

  const pagi =
    Object.keys(roomData.pagi).length === 0
      ? {
        _page: 1,
        _limit: 12,
        _totalRows: 12,
      }
      : roomData.pagi;

  useEffect(() => {
    dispatch(getroom({ _page: pagi._page, _limit: pagi._limit }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getroom({ ...filter, _page: pagi._page, _limit: pagi._limit }));
  }, [filter, dispatch, pagi._page, pagi._limit]);

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
    description: null,
    image: []
  })

  function addData(data) {
    let item = {
      name: data.name,
      idtyperoom: +data.idtyperoom,
      number: +data.number,
      pricePerday: +data.pricePerday,
      description: data.description,
      image: data.image
    }
    dispatch(addRoom(item))
    hideModal()
  }

  function editData(data) {
    let updateData = roomData.rooms.find(item => item.id === data.id)
    updateData = data
    updateData.updatedAt = +Date.now()
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
      description: null,
      image:[]
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
      <table className="table table-bordered">
        <thead>
          <tr>
            <th colSpan="1" className='add-th'>
              <div className='form-inline add-inline'>
                <button type="button" class="btn btn-primary" onClick={() => showModal(false, null)}>Add Room</button>
              </div>
            </th>
            <th colSpan="7" className='add-th'>
              <SortRoom />
            </th>
          </tr>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Number</th>
            <th scope="col">Rating</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {loader ?
          <tbody>
            <tr>
              <th colSpan="8" className='add-th'>
                <div className="lds-dual-ring"></div>
              </th>
            </tr>
          </tbody>
          :
          <tbody>{datas}</tbody>
        }
      </table>
      <Pagination
        defaultCurrent={pagi._page}
        total={pagi._totalRows}
        pageSize={pagi._limit}
        onChange={handleChangePagi}
      />

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