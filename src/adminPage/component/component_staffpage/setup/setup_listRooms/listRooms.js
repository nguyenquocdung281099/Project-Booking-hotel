import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import ItemRoom from '../itemRoom/itemRoom'
import { getroom } from '../../../../../redux/action/';

export default function ListRooms() {
  const dispatch = useDispatch()

  const roomData = useSelector((state) => state.room.room)

  useEffect(() => {
    dispatch(getroom())
  }, [])

  const datas = roomData.map((item, index) => {
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
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {datas}
        </tbody>
      </table>
    </div>
  )
}