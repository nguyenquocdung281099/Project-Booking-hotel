import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import ItemService from '../itemService/itemService'
import { getservice } from '../../../../../redux/action/';

export default function ListServices() {
    const dispatch = useDispatch()

    const serviceData = useSelector((state) => state.service.service)

    useEffect(() => {
        dispatch(getservice())
    }, [])

    const datas = serviceData.map((item, index) => {
        return <ItemService key={index} {...item} />
    })
    
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {datas}
                </tbody>
            </table>
        </div>
    )
}