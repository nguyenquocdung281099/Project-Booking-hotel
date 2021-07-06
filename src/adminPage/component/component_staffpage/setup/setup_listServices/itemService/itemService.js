export default function ItemService(props) {
    let { index, id, name, price, showModal, deleteData} = props

    return (
        <tr>
            <th scope="row">{index+1}</th>
            <td>{name}</td>
            <td>{price}</td>
   
            <td>
                <button type="button" className="btn btn-info" onClick={() => showModal(true, id)}>
                    <i class="fas fa-info"></i>
                </button>
                <button type="button" className="btn btn-danger" onClick={() => deleteData(id)}>
                    <i class="fas fa-ban"></i>
                </button>
            </td>
        </tr>
    )
}
