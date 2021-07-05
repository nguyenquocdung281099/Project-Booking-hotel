export default function ItemBooking(props) {
    let { index, id, idroom, userID, starttime, endtime, promoId, totalCost, status, paymethod } = props

    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{idroom}</td>
            <td>{userID}</td>
            <td>{starttime}</td>
            <td>{endtime}</td>
            <td>{status}</td>
            <td>
                <button type="button" className="btn btn-info">
                    <i class="fas fa-info"></i>
                </button>
                <button type="button" className="btn btn-secondary">
                    <i class="fas fa-file-invoice-dollar"></i>
                </button>
                <button type="button" className="btn btn-danger">
                    <i class="fas fa-ban"></i>
                </button>
            </td>
        </tr>
    )
}
