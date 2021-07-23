import SBadge from '../../../badge/badge'
import { Tooltip } from 'antd'

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
                <Tooltip placement="topRight" title={`Show Detail`} color="rgb(13, 202, 240)">
                    <button type="button" className="btn btn-info" onClick={() => showModal(id)}>
                        <i className="fas fa-info"></i>
                    </button>
                </Tooltip>
                <Tooltip placement="top" title="Check Out" color="rgb(108, 117, 125)">
                    <span style={{ cursor: !canCheckOut ? 'not-allowed' : 'pointer' }}>
                        <button type="button" disabled={!canCheckOut} className="btn btn-secondary" style={{ pointerEvents: 'none' }} onClick={() => checkout(id)}>
                            <i className="fas fa-file-invoice-dollar"></i>
                        </button>
                    </span>
                </Tooltip>
                <Tooltip placement="top" title="Cancel" color="rgb(220, 53, 69)">
                    <span style={{ cursor: !canCancel ? 'not-allowed' : 'pointer' }}>
                    <button type="button" disabled={!canCancel} className="btn btn-danger" style={{ pointerEvents: 'none' }} onClick={() => cancel(id)} >
                        <i className="fas fa-ban"></i>
                    </button>
                    </span>
                </Tooltip>
                <Tooltip placement="topLeft" title={`Invoice`} color="rgb(13, 110, 253)">
                    <button type="button" className="btn btn-primary" onClick={() => showInvoice(id)}>
                        <i class="fas fa-receipt"></i>
                    </button>
                </Tooltip>
            </td>
        </tr>
    )
}
