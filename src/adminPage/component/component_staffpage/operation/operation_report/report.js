import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Button } from "react-bootstrap";
import ItemReport from './item_report/item_report';
import "antd/dist/antd.css";
import { Pagination } from "antd";
import { CSVLink, CSVDownload } from "react-csv";

export default function Report(props) {
    let { isOpen, findRoomName } = props
    const mBData = useSelector((state) => state.bookingDB.bookingDB)
    const loader = useSelector((state) => state.bookingDB.loader)
    let mPagi = {
        _page: 1,
        _limit: 10,
        _totalRows: mBData.length,
    };

    let [day, setDay] = useState({ dayS: null, dayE: null })
    let [date, setDate] = useState({ dateS: null, dateE: null })

    const [mPIndex, setMPIndex] = useState({ minIndex: 0, maxIndex: 0 });

    useEffect(() => {
        setDay({ dayS: null, dayE: null })
        setDate({ dateS: null, dateE: null })
        handleChangeMPagi(mPagi._page, mPagi._limit)
        // eslint-disable-next-line
    }, [isOpen]);

    let cost = 0
    function handleDay(e) {
        switch (e.target.name) {
            case 'dayS':
                let tempDS = new Date(e.target.value)
                setDay({ ...day, dayS: tempDS })
                setDate({ ...date, dateS: e.target.value })
                break;
            case 'dayE':
                let tempDE = new Date(e.target.value)
                setDay({ ...day, dayE: tempDE })
                setDate({ ...date, dateE: e.target.value })
                break;
            default:
                break;
        }
    }

    const tMData = mBData.length !== 0 && mBData !== null && typeof mBData !== 'undefined' ?
        mBData.filter(e => ((new Date(e.dateStart)) - day.dayS) >= 0 && ((new Date(e.dateEnd)) - day.dayE) <= 0)
        : []


    if (mBData.length !== 0 && mBData !== null && typeof mBData !== 'undefined') {
        mPagi = {
            _page: 1,
            _limit: 10,
            _totalRows: tMData.length,
        };
    } else {
        mPagi = {
            _page: 1,
            _limit: 10
        }
    }

    tMData.length !== 0 && tMData !== null && typeof tMData !== 'undefined' ?
        tMData.forEach((e) => { cost += (Number.parseFloat(e.totalCost)) })
        : cost += 0

    function handleChangeMPagi(page, pageSize) {
        setMPIndex({
            ...mPIndex,
            minIndex: (page - 1) * pageSize,
            maxIndex: (page - 1) * pageSize + pageSize,
        });
        window.screenY = 0;
    }

    const dayString = (data) => {
        let tempDS = new Date(data)
        return `${tempDS.getDate()}/${tempDS.getMonth() + 1}/${tempDS.getFullYear()}`
    }

    const serString = (data) => {
        let tempAS = []

        data.length !== 0 && data !== null && typeof data !== 'undefined' ?
            data.forEach((item) => {
                tempAS.push(item.id)
            }) : tempAS = []
        return tempAS.join(",")
    }

    const headersCSV = [
        { label: "ID", key: "id" },
        { label: "User Name", key: "userName" },
        { label: "Room Number", key: "roomNumber" },
        { label: "Date Start", key: "dateStart" },
        { label: "Date End", key: "dateEnd" },
        { label: "Number of People", key: "number" },
        { label: "Pay Method", key: "paymethod" },
        { label: "List Service ID", key: "serviceID" },
        { label: "Status", key: "status" },
        { label: "Total Cost", key: "totalCost" }
    ];

    const dataCSV = tMData.length !== 0 && tMData !== null && typeof tMData !== 'undefined' ?
        tMData.map(({ id, userName, idroom, dateStart, dateEnd, number, paymethod, service, status, totalCost }) => ({
            id,
            userName,
            roomNumber: findRoomName(idroom),
            dateStart: dayString(dateStart),
            dateEnd: dayString(dateEnd),
            number,
            paymethod,
            serviceID: serString(service),
            status,
            totalCost: Number.parseFloat(totalCost).toFixed(2)
        })) : [];

    let tDataCSV = []
    if (dataCSV.length !== 0 && dataCSV !== null && typeof dataCSV !== 'undefined') {
        tDataCSV = dataCSV
        tDataCSV.push({
            id: "Total Revenue",
            userName: "",
            roomNumber: "From",
            dateStart: date.dateS,
            dateEnd: "",
            number: "To",
            paymethod: date.dateE,
            serviceID: "",
            status: "",
            totalCost: cost.toFixed(2)
        })
    } else {
        let tDataCSV = []
    }

    let nameCSV = "report"
    if (dataCSV.length !== 0 && dataCSV !== null && typeof dataCSV !== 'undefined') {
        let nameS = `-from-${day.dayS.getDate()}-${day.dayS.getMonth() + 1}-${day.dayS.getFullYear()}`
        let nameE = `-to-${day.dayE.getDate()}-${day.dayE.getMonth() + 1}-${day.dayE.getFullYear()}.csv`
        console.log(nameS)
        console.log(nameE)
        nameCSV = nameCSV.concat(nameS).concat(nameE)
        console.log(nameCSV)
    } else {
        let nameCSV = "report"
    }

    const canDownload = dataCSV.length !== 0 && dataCSV !== null && typeof dataCSV !== 'undefined' ? true : false
    return (
        <Modal
            show={isOpen}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={props.hideReport}
        >
            <Modal.Header closeButton onHide={props.hideReport}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Report
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th colSpan="7" className='add-th'>
                                <div className="form-inline add-inline">
                                    <div className="form-group my-1 mr-2">
                                        <label for="inputDayS" className="my-1 mr-2">From: </label>
                                        <input
                                            type="date"
                                            id="inputDayS"
                                            name="dayS"
                                            className="form-control"
                                            onChange={handleDay}
                                            value={date.dateS}
                                        >
                                        </input>
                                    </div>
                                    <div className="form-group my-1 mr-2">
                                        <label for="inputDayE" className="my-1 mr-2">To: </label>
                                        <input
                                            type="date"
                                            id="inputDayE"
                                            name="dayE"
                                            className="form-control"
                                            onChange={handleDay}
                                            value={date.dateE}
                                        >
                                        </input>
                                    </div>
                                </div>
                            </th>
                            <th colSpan="1" className='add-th'>
                                <div className="form-inline">
                                    <CSVLink data={tDataCSV} headers={headersCSV} filename={nameCSV}>
                                        <Button variant="primary" disabled={!canDownload}>
                                            <i class="fas fa-file-csv"></i> Export to CSV
                                        </Button>
                                    </CSVLink>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Room</th>
                            <th scope="col">User</th>
                            <th scope="col">Start</th>
                            <th scope="col">End</th>
                            <th scope="col">Number</th>
                            <th scope="col">Status</th>
                            <th scope="col">Total Cost</th>
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
                            {
                                tMData.length !== 0 &&
                                    tMData !== null &&
                                    typeof tMData !== 'undefined' ?
                                    tMData
                                        .filter((item, index) =>
                                            (index >= mPIndex.minIndex && index < mPIndex.maxIndex))
                                        .map((item, index) => {
                                            return (
                                                <ItemReport
                                                    key={`r.${index}`}
                                                    index={index}
                                                    {...item}
                                                    findRoomName={findRoomName}
                                                />
                                            )
                                        })
                                    : ("")
                            }
                        </tbody>
                    }
                    <tfoot>
                        <tr>
                            <th colSpan="7" className='add-th'>
                                Total Revenue:
                            </th>
                            <th colSpan="1" className='add-th'>
                                {cost.toFixed(2)}
                            </th>
                        </tr>
                    </tfoot>
                </table>
                <Pagination
                    style={{ textAlign: "center" }}
                    defaultCurrent={1}
                    pageSize={mPagi._limit}
                    total={mPagi._totalRows}
                    onChange={handleChangeMPagi}
                    showSizeChanger={false}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => props.hideReport()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}