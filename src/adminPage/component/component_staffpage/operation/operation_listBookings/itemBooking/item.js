import SBadge from '../../../badge/badge'

export default function ItemBooking(props) {
    let { index, id, dateStart, dateEnd, status, idroom, userName, number,
        showModal, checkout, cancel, findRoomName, showInvoice } = props
    const badge = SBadge(status)
    const dayStart = new Date(dateStart)
    const dayEnd = new Date(dateEnd)

    let canCheckOut = (status === 'NEW') ? false : (status === 'LIVEIN') ? true : false
    let canCancel = (status === 'NEW') ? true : false

    let rName = findRoomName(idroom)

    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{rName}</td>
            <td>{userName}</td>
            <td>{`${dayStart.getDate()}/${dayStart.getMonth() + 1}/${dayStart.getFullYear()}`}</td>
            <td>{`${dayEnd.getDate()}/${dayEnd.getMonth() + 1}/${dayEnd.getFullYear()}`}</td>
            <td>{number}</td>
            <td>{badge}</td>
            <td>
                <button type="button" className="btn btn-info" onClick={() => showModal(id)}>
                    <i className="fas fa-info"></i> Status
                </button>
                <button s type="button" disabled={!canCheckOut} className="btn btn-secondary" onClick={() => checkout(id)} >
                    <i className="fas fa-file-invoice-dollar"></i> Check Out
                </button>
                <button type="button" disabled={!canCancel} className="btn btn-danger" onClick={() => cancel(id)} >
                    <i className="fas fa-ban"></i> Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={() => showInvoice(id)}>
                <i class="fas fa-receipt"></i> Invoice
                </button>
            </td>
        </tr>
    )
}
