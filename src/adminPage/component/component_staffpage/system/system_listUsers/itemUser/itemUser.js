export default function ItemUser(props) {
    let { index, id, name, idRole, birthday, address, userName, email, showModal, deleteData } = props
    const roleName = (item) => {
        switch (item) {
            case 1:
                return 'Customer'
            case 2:
                return 'Admin'
            case 3:
                return 'Manager'
            case 4:
                return 'Sale'

            default:
                return ''
        }
    }
    return (
        <tr>
            <th scope="row">{index+1}</th>
            <td>{name}</td>
            <td>{roleName(idRole)}</td>
            <td>{birthday}</td>
            <td>{address}</td>
            <td>{userName}</td>
            <td>{email}</td>
            <td>
                <button type="button" className="btn btn-info" onClick={() => showModal(true, id)}>
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" className="btn btn-danger" onClick={() => deleteData(id)}>
                    <i class="fas fa-ban"></i>
                </button>
            </td>
        </tr>
    )
}
