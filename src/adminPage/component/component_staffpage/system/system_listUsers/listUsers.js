import './style.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ItemUser from '../itemUser/itemUser'
import { getuser } from '../../../../../redux/action/'


export default function ListUsers() {
    const dispatch = useDispatch()

    const userData = useSelector((state) => state.user.user)

    useEffect(function () {
        dispatch(getuser())
    }, [])

    let datas = userData.map((item, index) => {
        return <ItemUser key={index} {...item} {...item.userInfo} />
    })
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Role</th>
                        <th scope="col">Age</th>
                        <th scope="col">Address</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {datas}
                </tbody>
            </table>
        </div>
    )
}