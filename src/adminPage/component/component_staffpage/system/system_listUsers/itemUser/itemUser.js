export default function ItemUser(props) {
    let { index, id, name, role, age, address, userName } = props
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{role}</td>
            <td>{age}</td>
            <td>{address}</td>
            <td>{userName}</td>
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
