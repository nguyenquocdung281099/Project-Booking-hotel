import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import "antd/dist/antd.css";
import { Pagination } from "antd";
import ItemRoom from '../itemRoom/itemRoom'
import { getroom } from '../../../../../redux/action/';

export default function ListRooms() {
  const roomData = useSelector((state) => state.room)
  const filter = roomData.filter;
  const dispatch = useDispatch()
  const pagi =
    Object.keys(roomData.pagi).length === 0
      ? {
        _page: 1,
        _limit: 15,
        _totalRows: 20,
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

  // useEffect(() => {
  //   dispatch(getroom())
  // }, [])
  console.log(roomData.rooms)
  const datas = roomData.rooms.map((item, index) => {
    return <ItemRoom key={index} {...item} />
  })

  return (
    <div>
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
        </tbody>
      </table>
      <Pagination
            defaultCurrent={pagi._page}
            total={pagi._totalRows}
            pageSize={pagi._limit}
            onChange={handleChangePagi}
          />
    </div>
  )
}