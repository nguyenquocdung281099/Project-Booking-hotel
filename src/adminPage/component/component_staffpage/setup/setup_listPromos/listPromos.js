import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "antd/dist/antd.css";
import { Pagination } from "antd";
import ItemPromo from './itemPromo/itemPromo'
import { getpromo, delPromo, addPromo, editPromo } from '../../../../../redux/action/'
import ModalPromo from './setup_modalPromo/modalPromo'
import SortPromo from './setup_sortPromo/sortPromo';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalDelete from '../../modalDelete/modalDelete';

export default function ListPromos() {

    const dispatch = useDispatch();
    const promoData = useSelector((state) => state.promo)
    const loader = useSelector((state) => state.promo.loader)
    const filter = promoData.filter;

    const pagi =
        Object.keys(promoData.pagi).length === 0
            ? {
                _page: 1,
                _limit: 14,
                _totalRows: 12,
            }
            : promoData.pagi;

    useEffect(() => {
        dispatch(getpromo({ _page: pagi._page, _limit: pagi._limit }));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(getpromo({ ...filter, _page: pagi._page, _limit: pagi._limit }));
    }, [filter, dispatch, pagi._page, pagi._limit]);

    function handleChangePagi(page, pagesize) {
        dispatch(getpromo({ ...filter, _page: page, _limit: pagi._limit }));
        window.screenY = 0;
    }

    const [modalStatus, setModalStatus] = useState({
        isOpen: false,
        isEdit: false,
        id: null,
        name: null,
        code: null,
        amount: null,
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

    function addData(data) {
        let item = {
            name: data.name,
            discount: +data.discount,
            code: data.code,
            amount: +data.amount,
        }
        dispatch(addPromo(item))
        hideModal()
        toaster('ADD')
    }

    function editData(data) {
        let updateData = promoData.promo.find(item => item.id === data.id)
        updateData = data
        updateData.updatedAt = +Date.now()
        dispatch(editPromo(updateData))
        hideModal()
        toaster('EDIT')
    }

    function deleteData(id) {
        dispatch(delPromo(id))
        toaster('DELETE')
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
        let data = { id: null, name: null, discount: null, code: null, amount: null, }
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

    const datas = promoData.promo.map((item, index) => {
        return <ItemPromo key={index} index={index} {...item}
            showModalDel={showModalDel}
            showModal={showModal}
        />
    })

    return (
        <div>
            <ToastContainer />

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th colSpan="1" className='add-th'>
                            <div className='form-inline add-inline'>
                                <button type="button" class="btn btn-primary" onClick={() => showModal(false, null)}>Add Promo</button>
                            </div>
                        </th>
                        <th colSpan="6" className='add-th'>
                            <SortPromo />
                        </th>
                    </tr>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Code</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {loader ?
                    <tbody>
                        <tr>
                            <th colSpan="7" className='add-th'>
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

            < ModalPromo
                key={modalStatus.id}
                {...modalStatus}
                addData={addData}
                editData={editData}
                hideModal={hideModal}
            />

            <ModalDelete
                {...modalDelStatus}
                hideModalDel={hideModalDel}
                deleteConfirm={deleteConfirm}
            />
        </div >
    )
}