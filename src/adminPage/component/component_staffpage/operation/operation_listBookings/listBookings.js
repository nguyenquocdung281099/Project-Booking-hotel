import './style.css';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "antd/dist/antd.css";
import { Pagination } from "antd";
import ItemBooking from './itemBooking/item';
import { getBookingDB, editBookingDB, getroom, getUserDB, changeFilter } from '../../../../../redux/action/'
import ModalBooking from './operation_modalBooking/modalBooking';
import SortBooking from './operation_sortBookings/sortBooking';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Invoice from '../operation_invoice/invoice'

export default function ListBookings() {

    const dispatch = useDispatch();
    const bookingDBData = useSelector((state) => state.bookingDB)
    const loader = useSelector((state) => state.bookingDB.loader)
    const filter = bookingDBData.filter;
    const roombkPage = useSelector((state) => state.room.rooms)
    const userbkPage = useSelector((state) => state.userDB.userDB)
    const pagi =
        Object.keys(bookingDBData.pagi).length === 0
            ? {
                _page: 1,
                _limit: 14,
                _totalRows: 12,
            }
            : bookingDBData.pagi;

    useEffect(() => {
        dispatch(getBookingDB({ _page: pagi._page, _limit: pagi._limit }));
        dispatch(getroom({}))
        dispatch(getUserDB({}))
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(getBookingDB({ ...filter, _page: pagi._page, _limit: pagi._limit }));
    }, [filter, dispatch, pagi._page, pagi._limit]);

    function handleChangePagi(page, pagesize) {
        dispatch(getBookingDB({ ...filter, _page: page, _limit: pagi._limit }));
        window.screenY = 0;
    }

    const [modalStatus, setModalStatus] = useState({
        isOpen: false,
        id: null,
        idroom: null,
        idUser: null,
        dateStart: null,
        dateEnd: null,
        codeDiscount: null,
        totalCost: null,
        status: null,
        paymethod: null,
        number: null,
        service: [],
        createdAt: null,
        updatedAt: null,
        userName: null,
    })

    const toaster = (data) => {
        switch (data.status) {
            case 'CANCEL':
                return toast.success("Cancel Success!");
            case 'CHECKED OUT':
                return toast.success("Checkout Success!");
            default:
                return toast.success("Edit Success!");
        }
    }

    function editData(data) {
        let updateData = bookingDBData.bookingDB.find(item => item.id === data.id)
        updateData = data
        updateData.updatedAt = +Date.now()
        dispatch(editBookingDB(updateData))
        toaster(updateData)
        hideModal()
    }

    const showModal = (a) => {
        let newState = { ...modalStatus }
        let data = bookingDBData.bookingDB.find(item => {
            return item.id === a
        })
        newState = { ...newState, isOpen: true, ...data }
        setModalStatus(newState)
    };

    const hideModal = () => {
        let newState = { ...modalStatus }
        let data = {
            id: null,
            idroom: null,
            idUser: null,
            dateStart: null,
            dateEnd: null,
            codeDiscount: null,
            totalCost: null,
            status: null,
            paymethod: null,
            number: null,
            service: [],
            createdAt: null,
            updatedAt: null,
            userName: null
        }
        newState = { ...newState, isOpen: false, ...data };
        setModalStatus(newState)
    };

    const findUserName = (data) => {
        let obj = userbkPage.find(element => element.id === data)
        return obj ? obj.name : ""
    }

    const findRoomName = (id) => {
        let obj = roombkPage.find(element => element.id === id)
        return obj ? obj.name : ""
    }

    const findUser = (data) => {
        let obj = userbkPage.find(element => element.id === data)
        return obj ? obj : ""
    }

    const checkout = (id) => {
        let updateData = bookingDBData.bookingDB.find(item => item.id === id)
        updateData.status = 'CHECKED OUT'
        dispatch(editBookingDB(updateData))
        toaster(updateData)
    }

    const cancel = (id) => {
        let updateData = bookingDBData.bookingDB.find(item => item.id === id)
        updateData.status = 'CANCEL'
        dispatch(editBookingDB(updateData))
        toaster(updateData)
    }

    const [invoiceStatus, setInvoiceStatus] = useState({
        isOpen: false,
        id: null,
        idroom: null,
        idUser: null,
        dateStart: null,
        dateEnd: null,
        codeDisount: null,
        totalCost: null,
        status: null,
        paymethod: null,
        number: null,
        service: [],
        userName: null
    });

    const showInvoice = (a) => {
        let newState = { ...modalStatus }
        let data = bookingDBData.bookingDB.find(item => {
            return item.id === a
        })
        newState = { ...newState, isOpen: true, ...data }
        setInvoiceStatus(newState)
    };

    const hideInvoice = () => {
        let newState = { ...modalStatus }
        let data = {
            id: null,
            idroom: null,
            idUser: null,
            dateStart: null,
            dateEnd: null,
            codeDisount: null,
            totalCost: null,
            status: null,
            paymethod: null,
            number: null,
            service: [],
            userName: null
        }
        newState = { ...newState, isOpen: false, ...data };
        setInvoiceStatus(newState)
    };

    const datas = bookingDBData.bookingDB.map((item, index) => {
        return <ItemBooking
            key={index}
            index={index}
            {...item}
            showModal={showModal}
            checkout={checkout}
            cancel={cancel}
            findUserName={findUserName}
            findRoomName={findRoomName}
            showInvoice={showInvoice}
        />
    })

    function handleSearch(data) {
        if (data.value !== "") {
            let string = '{"' + data.key + '_like":"' + data.value + '"}'
            let a = JSON.parse(string)
            dispatch(
                changeFilter({
                    ...filter,
                    ...a
                })
            )
        } else {
            // dispatch(getBookingDB({ _page: pagi._page, _limit: pagi._limit }))
            dispatch(changeFilter({}))
            console.log(filter)
        }
    }

    return (
        <div className='operation_content content'>
            <ToastContainer />

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th colSpan="8" className='add-th'>
                            <SortBooking handleSearch={handleSearch}/>
                        </th>
                    </tr>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Room</th>
                        <th scope="col">User</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Number</th>
                        <th scope="col">Status</th>
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
                    <tbody>{datas}</tbody>
                }
            </table>
            <Pagination
                defaultCurrent={pagi._page}
                total={pagi._totalRows}
                pageSize={pagi._limit}
                onChange={handleChangePagi}
            />

            < ModalBooking
                key={`${modalStatus.id}-bmodal`}
                {...modalStatus}
                hideModal={hideModal}
                editData={editData}
                findRoomName={findRoomName}
            />

            <Invoice
                key={`${invoiceStatus.id}-imodal`}
                {...invoiceStatus}
                hideInvoice={hideInvoice}
                findRoomName={findRoomName}
                findUser={findUser}
            />
        </div>
    )
}