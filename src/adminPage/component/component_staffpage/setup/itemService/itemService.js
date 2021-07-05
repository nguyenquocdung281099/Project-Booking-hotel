export default function ItemService(props) {
    let { index, id, name, price} = props

    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{price}</td>
   
            <td>
                <button type="button" className="btn btn-info">
                    <i class="fas fa-info"></i>
                </button>
                <button type="button" className="btn btn-danger">
                    <i class="fas fa-ban"></i>
                </button>
            </td>
        </tr>
    )
}
