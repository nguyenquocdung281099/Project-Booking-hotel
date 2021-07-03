import './style.css';
import ItemBooking from '../itemBooking/item';

export default function BookingManagement() {
    let boookingData = [
        {
            "id": "1",
            "idroom": "1",
            "userID": "1",
            "starttime": "",
            "endtime": "",
            "promoId": 1,
            "totalCost": "",
            "status": "NEW",
            "paymethod": {
                "idpaymethod": 1,
                "status": true
            }
        }
    ]
    let datas = boookingData.map((item, index) => {
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