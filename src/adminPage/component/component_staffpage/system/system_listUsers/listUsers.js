import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "antd/dist/antd.css";
import { Pagination } from "antd";
import ItemUser from './itemUser/itemUser'
import { delUserDB, getUserDB } from '../../../../../redux/action/'
import { editUser } from '../../../../../redux/action/index'
import ModalUser from './system_modalUser/modalUser'
import SortUser from './system_sortUser/sortUser'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalDelete from '../../modalDelete/modalDelete';

export default function ListUsers() {

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userDB)
    const loader = useSelector((state) => state.userDB.loader)
    const filter = userData.filter;
    const pagi =
    {
        _page: 1,
        _limit: 14,
        _totalRows: userData.userDB.length,
    }

    const [pindex, setPIndex] = useState({ minIndex: 0, maxIndex: 0 })

    useEffect(() => {
        dispatch(getUserDB({}));
        handleChangePagi(pagi._page, pagi._limit)
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(getUserDB({}));
    }, [dispatch, userData])

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
        birthday: null,
        email: null,
        address: null,
        password: null,
        createdAt: null,
        updatedAt: null
    })

    const [modalDelStatus, setModalDelStatus] = useState({
        isOpen: false,
        id: null
    })

    const toaster = (data) => {
        switch (data) {
            case 'ADD':
                return toast.success("Add Success!");
            case 'EDIT':
                return toast.success("Edit Success!");
            case 'DELETE':
                return toast.success("Delete Success!");
            default:
                return toast.success("Edit Success!");
        }
    }

    function editData(data) {
        let updateData = userData.userDB.find(item => item.id === data.id)
        updateData = data
        updateData.updatedAt = +Date.now()
        dispatch(editUser(updateData.id, updateData))
        dispatch(getUserDB({}))
        hideModal()
        toaster('EDIT')
    }

    function deleteData(id) {
        dispatch(delUserDB(id))
        toaster('DELETE')
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
            id: null,
            name: null,
            idRole: null,
            birthday: null,
            email: null,
            address: null,
            password: null,
            createdAt: null,
            updatedAt: null
        }
        newState = { ...newState, isOpen: false, isEdit: null, ...data };
        setModalStatus(newState)
    };

    const showModalDel = (i, a) => {
        let newState = { ...modalDelStatus }
        newState = { ...newState, isOpen: i, id: a }
        setModalDelStatus(newState)
    }

    const hideModalDel = () => {
        setModalDelStatus({ isOpen: false, id: null })
    }

    const deleteConfirm = (data) => {
        hideModalDel()
        deleteData(data)
    }

    return (
        <div>
            <ToastContainer />

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th colSpan="8" className='add-th'>
                            <SortUser />
                        </th>
                    </tr>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Role</th>
                        <th scope="col">Birth</th>
                        <th scope="col">Address</th>
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
                                    showModalDel={showModalDel}
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
                editData={editData}
                hideModal={hideModal}
            />

            <ModalDelete
                {...modalDelStatus}
                hideModalDel={hideModalDel}
                deleteConfirm={deleteConfirm}
            />
        </div>
    )
}