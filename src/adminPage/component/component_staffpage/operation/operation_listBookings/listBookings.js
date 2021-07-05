import './style.css';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ItemBooking from '../itemBooking/item';
import { getbooking } from '../../../../../redux/action/'

export default function ListBookings() {
    const dispatch = useDispatch()

    const bookingData = useSelector((state) => state.booking.booking)

    useEffect(function () {
        dispatch(getbooking())
    }, [])

    const datas = bookingData.map((item, index) => {
        return <ItemBooking key={index} {...item} />
    })

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Room</th>
                        <th scope="col">User</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
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