import SBadge from '../../../badge/badge'

export default function ItemBooking(props) {
    let { index, id, starttime, endtime, status, userName, roomName, paymethod,
    showModal, checkout } = props
    let badge = SBadge(status)
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{roomName}</td>
            <td>{userName}</td>
            <td>{starttime}</td>
            <td>{endtime}</td>
            <td>{badge}</td>
            <td>
                <button type="button" className="btn btn-info" onClick={() => showModal(id)}>
                    <i className="fas fa-info"></i>
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => checkout(id) }>
                    <i className="fas fa-file-invoice-dollar"></i>
                </button>
                <button type="button" className="btn btn-danger">
                    <i className="fas fa-ban"></i>
                </button>
            </td>
        </tr>
    )
}
