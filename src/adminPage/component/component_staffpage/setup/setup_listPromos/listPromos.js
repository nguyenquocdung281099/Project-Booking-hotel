import './style.css'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ItemPromo from '../itemPromo/itemPromo'
import { getpromo } from '../../../../../redux/action/'
import ModalPromo from '../setup_modalPromo/modalPromo'

export default function ListPromos() {

    // const dispatch = useDispatch();
    // const promoData = useSelector((state) => state.promo.promo)
    // const loader  = useSelector((state) => state.promo.loader)
    // useEffect(function () {
    //     dispatch(getpromo());
    // }, []);

    const [promoData, setPromoData] = useState([
        {
            "id": 1,
            "name": "giảm giá mùa hè",
            "discount": 5,
            "startTime": "2021/04/30",
            "endTime": "2021/05/30"
        },
        {
            "id": 2,
            "name": "giảm giá ngày kỉ niệm khách sạn ",
            "discount": 10,
            "startTime": "2021/09/30",
            "endTime": "2021/10/15"
        }
    ])

    const [modalStatus, setModalStatus] = useState({
        isOpen: false,
        isEdit: false,
        id: null,
        name: null,
        discount: null,
        startTime: null,
        endTime: null
    })

    function addPromo(data) {
        let item = {
            id: promoData.length + 1,
            name: data.name,
            discount: data.discount,
            startTime: data.startTime,
            endTime: data.endTime
        }
        setPromoData([...promoData, item])
        hideModal()
    }

    function editPromo(data) {
        let updateData = [...promoData].map((item) => {
            if (item.id === data.id) {
                item = data
            }
            return item;
        })
        setPromoData(updateData);
        hideModal()
    }

    function deletePromo(id) {
        let delPromo = [...promoData].filter((item) => item.id !== id)
        setPromoData(delPromo)
    }

    const showModal = (i, a) => {
        let newState = { ...modalStatus }
        let data = promoData.find(item => {
            return item.id === a
        })
        newState = { ...newState, isOpen: true, isEdit: i, ...data }
        console.log('show', newState)
        setModalStatus(newState)
    };

    const hideModal = () => {
        let newState = { ...modalStatus }
        let data = { id: null, name: null, discount: null, startTime: null, endTime: null }
        newState = { ...newState, isOpen: false, isEdit: null, ...data };
        console.log('close', newState)
        setModalStatus(newState)
    };

    const datas = promoData.map((item, index) => {
        return <ItemPromo key={index} index={index} {...item}
            deletePromo={deletePromo}
            showModal={showModal}
        />
    })

    return (
        <div>
            <button type="button" class="btn btn-primary" onClick={() => showModal(false, null)}>Add Promotion</button>
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
                </tbody>
                {/* <div style={{display: loader}} className="lds-dual-ring"></div> */}
            </table>
            < ModalPromo
                key={modalStatus.id}
                {...modalStatus}
                addPromo={addPromo}
                editPromo={editPromo}
                hideModal={hideModal}
            />
        </div >
    )
}