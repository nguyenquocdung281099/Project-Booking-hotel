import SBadge from '../../../badge/badge'

export default function ItemReport(props) {
    let { index, id, dateStart, dateEnd, status, idroom, userName, number,
       findRoomName, totalCost } = props
    
    const badge = SBadge(status)
    const dayStart = new Date(dateStart)
    const dayEnd = new Date(dateEnd)

    let rName = findRoomName(idroom)

    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{rName}</td>
            <td>{userName}</td>
            <td>{`${dayStart.getDate()}/${dayStart.getMonth() + 1}/${dayStart.getFullYear()}`}</td>
            <td>{`${dayEnd.getDate()}/${dayEnd.getMonth() + 1}/${dayEnd.getFullYear()}`}</td>
            <td>{number}</td>
            <td>{badge}</td>
            <td>{Number.parseFloat(totalCost).toFixed(2)}</td>
        </tr>
    )
}
