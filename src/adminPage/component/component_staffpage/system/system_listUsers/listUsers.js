import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "antd/dist/antd.css";
import { Pagination } from "antd";
import ItemUser from './itemUser/itemUser'
import { addUserDB, delUserDB, editUserDB, getUserDB } from '../../../../../redux/action/'
import ModalUser from './system_modalUser/modalUser'
import SortUser from './system_sortUser/sortUser'

export default function ListUsers() {

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userDB)
    const loader = useSelector((state) => state.userDB.loader)
    const filter = userData.filter;
    const pagi =
    {
        _page: 1,
        _limit: 12,
        _totalRows: userData.userDB.length,
    }
 
    const [pindex, setPIndex] = useState({ minIndex: 0, maxIndex: 0 })

    useEffect(() => {
        dispatch(getUserDB({}));
        handleChangePagi(pagi._page,pagi._limit)
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(getUserDB({ ...filter }));
    }, [filter, dispatch, pindex]);

    function handleChangePagi(page, pageSize) {
        dispatch(getUserDB({ ...filter }));
        setPIndex({
            ...pindex,
            minIndex: (page - 1) * pageSize,
            maxIndex: (page - 1) * pageSize + pageSize
        })
        window.screenY = 0;
    }

    const [modalStatus, setModalStatus] = useState({
        isOpen: false,
        isEdit: false,
        id: null,
        name: null,
        idRole: null,
        userName: null,
        birthday: null,
        email: null,
        address: null,
    })

    function addData(data) {
        let item = {
            name: data.name,
            idRole: +data.idRole,
            userName: data.userName,
            birthday: data.birthday,
            email: data.email,
            address: data.address
        }
        dispatch(addUserDB(item))
        hideModal()
    }

    function editData(data) {
        let updateData = userData.userDB.find(item => item.id === data.id)
        updateData = data
        updateData.updatedAt = +Date.now()
        dispatch(editUserDB(updateData))
        hideModal()
    }

    function deleteData(id) {
        dispatch(delUserDB(id))
    }

    const showModal = (i, a) => {
        let newState = { ...modalStatus }
        let data = userData.userDB.find(item => {
            return item.id === a
        })
        newState = { ...newState, isOpen: true, isEdit: i, ...data }
        setModalStatus(newState)
    };

    const hideModal = () => {
        let newState = { ...modalStatus }
        let data = {
            name: null,
            idRole: null,
            userName: null,
            birthday: null,
            email: null,
            address: null,
        }
        newState = { ...newState, isOpen: false, isEdit: null, ...data };
        setModalStatus(newState)
    };

    return (
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th colSpan="1" className='add-th'>
                            <div className='form-inline add-inline'>
                                <button type="button" class="btn btn-primary" onClick={() => showModal(false, null)}>Add User</button>
                            </div>
                        </th>
                        <th colSpan="7" className='add-th'>
                            <SortUser />
                        </th>
                    </tr>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">ID Role</th>
                        <th scope="col">Birth</th>
                        <th scope="col">Address</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {loader ?
                    <tbody>
                        <tr>
                            <th colSpan="8" className='add-th'>
                                <div className="lds-dual-ring"></div>
                            </th>
                        </tr>
                    </tbody>
                    :
                    <tbody>
                        {userData.userDB.map((item, index) => {
                            if (index >= pindex.minIndex
                                &&
                                index < pindex.maxIndex) {
                                return <ItemUser key={index} index={index} {...item}
                                    deleteData={deleteData}
                                    showModal={showModal}
                                />
                            }
                        })}
                    </tbody>
                }
            </table>
            <Pagination
                defaultCurrent={pagi._page}
                pageSize={pagi._limit}
                total={pagi._totalRows}
                onChange={handleChangePagi}
            />

            < ModalUser
                key={modalStatus.id}
                {...modalStatus}
                addData={addData}
                editData={editData}
                hideModal={hideModal}
            />
        </div>
    )
}