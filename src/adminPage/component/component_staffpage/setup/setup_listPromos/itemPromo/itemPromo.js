export default function ItemPromo(props) {
    let { index, id, name, discount, code, amount, expiryDate, showModal, showModalDel } = props
    const expire = new Date(expiryDate)
    return (
        <tr>
            <th scope="row">{index+1}</th>
            <td>{name}</td>
            <td>{discount} %</td>
            <td>{code}</td>
            <td>{amount}</td>
            <td>{`${expire.getDate()}/${expire.getMonth() + 1}/${expire.getFullYear()}`}</td>
            <td>
                <button type="button" className="btn btn-info" onClick={() => showModal(true, id)}>
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" className="btn btn-danger" onClick={() => showModalDel(true, id)}>
                    <i class="fas fa-ban"></i>
                </button>
            </td>
        </tr>
    )
}
