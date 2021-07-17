import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import "antd/dist/antd.css";
import { Pagination } from "antd";
import ItemService from './itemService/itemService'
import { addService, delService, editService, getservice } from '../../../../../redux/action/';
import ModalService from './setup_modalService/modalService'
import SortService from './setup_sortService/sortService';

export default function ListServices() {

    const dispatch = useDispatch()
    const serviceData = useSelector((state) => state.service)
    const loader = useSelector((state) => state.service.loader)
    const filter = serviceData.filter;

    const pagi =
        Object.keys(serviceData.pagi).length === 0
            ? {
                _page: 1,
                _limit: 12,
                _totalRows: 12,
            }
            : serviceData.pagi;

    useEffect(() => {
        dispatch(getservice({ _page: pagi._page, _limit: pagi._limit }));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(getservice({ ...filter, _page: pagi._page, _limit: pagi._limit }));
    }, [filter, dispatch, pagi._page, pagi._limit]);

    function handleChangePagi(page, pagesize) {
        dispatch(getservice({ ...filter, _page: page, _limit: pagi._limit }));
        window.screenY = 0;
    }

    const [modalStatus, setModalStatus] = useState({
        isOpen: false,
        isEdit: false,
        id: null,
        name: null,
        price: null
    })

    function addData(data) {
        let item = {
            name: data.name,
            price: +data.price,
        }
        dispatch(addService(item))
        hideModal()
    }

    function editData(data) {
        let updateData = serviceData.service.find(item => item.id === data.id)
        updateData = data
        dispatch(editService(updateData))
        hideModal()
    }

    function deleteData(id) {
        dispatch(delService(id))
    }

    const showModal = (i, a) => {
        let newState = { ...modalStatus }
        let data = serviceData.service.find(item => {
            return item.id === a
        })
        newState = { ...newState, isOpen: true, isEdit: i, ...data }
        setModalStatus(newState)
    };

    const hideModal = () => {
        let newState = { ...modalStatus }
        let data = { id: null, name: null, price: null }
        newState = { ...newState, isOpen: false, isEdit: null, ...data };
        setModalStatus(newState)
    };

    const datas = serviceData.service.map((item, index) => {
        return <ItemService key={index} index={index} {...item}
            deleteData={deleteData}
            showModal={showModal} />
    })

    return (
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th colSpan="1" className='add-th'>
                            <div className='form-inline add-inline'>
                                <button type="button" class="btn btn-primary" onClick={() => showModal(false, null)}>Add Service</button>
                            </div>
                        </th>
                        <th colSpan="3" className='add-th'>
                            <SortService />
                        </th>
                    </tr>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {loader ?
                    <tbody>
                        <tr>
                            <th colSpan="4" className='add-th'>
                                <div className="lds-dual-ring"></div>
                            </th>
                        </tr>
                    </tbody>
                    :
                    <tbody>{datas}</tbody>
                }
            </table>
            <Pagination
                defaultCurrent={pagi._page}
                total={pagi._totalRows}
                pageSize={pagi._limit}
                onChange={handleChangePagi}
            />
            < ModalService
                key={modalStatus.id}
                {...modalStatus}
                addData={addData}
                editData={editData}
                hideModal={hideModal}
            />
        </div>
    )
}