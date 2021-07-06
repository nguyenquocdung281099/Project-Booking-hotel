import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "antd/dist/antd.css";
import { Pagination } from "antd";
import ItemPromo from './itemPromo/itemPromo'
import { getpromo, delPromo, addPromo, editPromo } from '../../../../../redux/action/'
import ModalPromo from './setup_modalPromo/modalPromo'

export default function ListPromos() {

    const dispatch = useDispatch();
    const promoData = useSelector((state) => state.promo)
    const loader = useSelector((state) => state.promo.loader)
    const filter = promoData.filter;

    const pagi =
        Object.keys(promoData.pagi).length === 0
            ? {
                _page: 1,
                _limit: 15,
                _totalRows: 15,
            }
            : promoData.pagi;

    useEffect(() => {
        dispatch(getpromo({ _page: pagi._page, _limit: pagi._limit }));
    }, []);

    useEffect(() => {
        dispatch(getpromo({ ...filter, _page: pagi._page, _limit: pagi._limit }));
    }, [filter]);

    function handleChangePagi(page, pagesize) {
        dispatch(getpromo({ ...filter, _page: page, _limit: pagi._limit }));
        window.screenY = 0;
    }

    const [modalStatus, setModalStatus] = useState({
        isOpen: false,
        isEdit: false,
        id: null,
        name: null,
        discount: null,
        startTime: null,
        endTime: null
    })

    function addData(data) {
        let item = {
            name: data.name,
            discount: +data.discount,
            startTime: data.startTime,
            endTime: data.endTime
        }
        dispatch(addPromo(item))
        hideModal()
    }

    function editData(data) {
        let updateData = promoData.promo.find(item => item.id === data.id)
        updateData = data
        dispatch(editPromo(updateData))
        hideModal()
    }

    function deleteData(id) {
        dispatch(delPromo(id))
    }

    const showModal = (i, a) => {
        let newState = { ...modalStatus }
        let data = promoData.promo.find(item => {
            return item.id === a
        })
        newState = { ...newState, isOpen: true, isEdit: i, ...data }
        setModalStatus(newState)
    };

    const hideModal = () => {
        let newState = { ...modalStatus }
        let data = { id: null, name: null, discount: null, startTime: null, endTime: null }
        newState = { ...newState, isOpen: false, isEdit: null, ...data };
        setModalStatus(newState)
    };

    const datas = promoData.promo.map((item, index) => {
        return <ItemPromo key={index} index={index} {...item}
            deleteData={deleteData}
            showModal={showModal}
        />
    })

    return (
        <div>
            <button type="button" class="btn btn-primary" onClick={() => showModal(false, null)}>Add Promotion</button>
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
                        <th scope="col">Discount</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {datas}
                    <td colSpan="6"><div style={{ display: loader }} className="lds-dual-ring"></div></td>
                </tbody>
            </table>
            
            < ModalPromo
                key={modalStatus.id}
                {...modalStatus}
                addData={addData}
                editData={editData}
                hideModal={hideModal}
            />
        </div >
    )
}