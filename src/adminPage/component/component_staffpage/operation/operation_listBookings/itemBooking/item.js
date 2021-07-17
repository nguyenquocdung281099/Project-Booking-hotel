import SBadge from '../../../badge/badge'

export default function ItemBooking(props) {
    let { index, id, dateStart, dateEnd, status, userName, roomName, paymethod,
    showModal, checkout, cancel } = props
    const badge = SBadge(status)
    const dayStart = new Date(dateStart)
    const dayEnd = new Date(dateEnd)

    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{roomName}</td>
            <td>{userName}</td>
            <td>{`${dayStart.getDay()}/${dayStart.getMonth() + 1}/${dayStart.getFullYear()}`}</td>
            <td>{`${dayEnd.getDay()}/${dayEnd.getMonth() + 1}/${dayEnd.getFullYear()}`}</td>
            <td>{paymethod.status === true ? "Paid" : "Unpaid"}</td>
            <td>{badge}</td>
            <td>
                <button type="button" className="btn btn-info" onClick={() => showModal(id)}>
                    <i className="fas fa-info"></i>
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => checkout(id)} >
                    <i className="fas fa-file-invoice-dollar"></i>
                </button>
                <button type="button" className="btn btn-danger" onClick={() => cancel(id)} >
                    <i className="fas fa-ban"></i>
                </button>
            </td>
        </tr>
    )
}
