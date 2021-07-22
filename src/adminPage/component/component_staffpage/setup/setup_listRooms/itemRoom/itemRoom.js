export default function ItemRoom(props) {
    let { index, id, name, idtyperoom, number, rating, pricePerday, status, showModal, showModalDel } = props

    const typeName = (item) => {
        switch (item) {
            case 1:
                return 'Classic'
            case 2:
                return 'Budget'
            case 3:
                return 'Single'
            case 4:
                return 'Royal Suite'
            case 5:
                return 'Luxury'
            case 6:
                return 'Premium'
            default:
                return ''
        }
    }

    return (
        <tr>
            <th scope="row">{index+1}</th>
            <td>{name}</td>
            <td>{typeName(idtyperoom)}</td>
            <td>{number} <i class="fas fa-user"></i></td>
            <td>{rating} <i class="fas fa-star"></i></td>
            <td>{pricePerday} $</td>
            <td>{status}</td>
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
