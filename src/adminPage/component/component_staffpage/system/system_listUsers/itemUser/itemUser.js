export default function ItemUser(props) {
    let { index, id, name, idRole, birthday, address, userName, email, showModal, showModalDel } = props
    const roleName = (item) => {
        switch (item) {
            case "user1":
                return 'Customer'
            case "user2":
                return 'Admin'
            case "user3":
                return 'Manager'
            case "user4":
                return 'Sale'
            default:
                return ''
        }
    }

    return (
        <tr>
            <th scope="row">{index+1}</th>
            <td>{userName}</td>
            <td>{roleName(idRole)}</td>
            <td>{birthday}</td>
            <td>{address}</td>
            <td>{email}</td>
            <td>
                <button type="button" className="btn btn-info" onClick={() => showModal(true, id)}>
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button type="button" className="btn btn-danger" onClick={() => showModalDel(true, id)}>
                    <i class="fas fa-ban"></i> Delete
                </button>
            </td>
        </tr>
    )
}
