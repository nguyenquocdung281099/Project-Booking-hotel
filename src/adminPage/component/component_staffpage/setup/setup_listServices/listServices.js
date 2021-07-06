import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import "antd/dist/antd.css";
import { Pagination } from "antd";
import ItemService from './itemService/itemService'
import { addService, delService, editService, getservice } from '../../../../../redux/action/';
import ModalService from './setup_modalService/modalService'

export default function ListServices() {

    const dispatch = useDispatch()
    const serviceData = useSelector((state) => state.service)
    const loader = useSelector((state) => state.promo.loader)
    const filter = serviceData.filter;

    const pagi =
        Object.keys(serviceData.pagi).length === 0
            ? {
                _page: 1,
                _limit: 15,
                _totalRows: 15,
            }
            : serviceData.pagi;

    useEffect(() => {
        dispatch(getservice({ _page: pagi._page, _limit: pagi._limit }));
    }, []);

    useEffect(() => {
        dispatch(getservice({ ...filter, _page: pagi._page, _limit: pagi._limit }));
    }, [filter]);

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
        let data = { id: null, name: null, price: null}
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
            <button type="button" class="btn btn-primary" onClick={() => showModal(false, null)}>Add Service</button>
            <Pagination
                defaultCurrent={pagi._page}
                total={pagi._totalRows}
                pageSize={pagi._limit}
                onChange={handleChangePagi}
            />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {datas}
                    <td colSpan="6"><div style={{ display: loader }} className="lds-dual-ring"></div></td>
                </tbody>
            </table>
            
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