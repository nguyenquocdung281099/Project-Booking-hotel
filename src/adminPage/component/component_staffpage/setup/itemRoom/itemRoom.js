export default function ItemRoom(props) {
    let { index, id, name, idtyperoom, status } = props

    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{idtyperoom}</td>
            <td>{status}</td>
            <td>
                <button type="button" className="btn btn-info">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" className="btn btn-danger">
                    <i class="fas fa-ban"></i>
                </button>
            </td>
        </tr>
    )
}
