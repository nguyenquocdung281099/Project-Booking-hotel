import './style.css'
import { Modal, Button } from "react-bootstrap";

export default function Invoice(props) {
    let { id, idroom, idUser, dateStart, dateEnd, codeDiscount, totalCost, status,
        paymethod, number, service, createdAt, updatedAt, isOpen, findRoomName, findUser } = props;

    const dayStart = new Date(dateStart)
    let dayS = `${dayStart.getDate()}/${dayStart.getMonth() + 1}/${dayStart.getFullYear()}`
    const dayEnd = new Date(dateEnd)
    let dayE = `${dayEnd.getDate()}/${dayEnd.getMonth() + 1}/${dayEnd.getFullYear()}`

    let sCost = 0;
    sCost = (service.length !== 0 || service !== null) ? sCost + service.map(item => item.price) : 0
    let bCost = totalCost - sCost
    let uInfo = findUser(idUser)
    return (
        <Modal
            show={isOpen}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={props.hideInvoice}
        >
            <Modal.Header closeButton onHide={props.hideInvoice}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Info Booking
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="row">
                            <div className="col-xs-5">
                                <h4 className="page-title">Invoice</h4>
                            </div>
                            <div className="col-xs-7 text-right m-b-30">
                                <div className="btn-group btn-group-sm">
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="panel">
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-6 m-b-20">
                                                <img src="assets/img/logo2.png" className="inv-logo" alt=""></img>
                                                <ul className="list-unstyled">
                                                    <li>THE GEM</li>
                                                    <li>908 New Hampshire Avenue Northwest #100,</li>
                                                    <li>Washington, DC 20037, United States</li>
                                                    <li>GST No:</li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6 m-b-20">
                                                <div className="invoice-details">
                                                    <h3 className="text-uppercase">{`Invoice #INV-${id}`}</h3>
                                                    <ul className="list-unstyled">
                                                        <li>Date: <span>{dayS}</span></li>
                                                        <li>Due date: <span>{dayE}</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-9 m-b-20">
                                                <h5>Invoice to:</h5>
                                                <ul className="list-unstyled">
                                                    <li>
                                                        <h5><strong>{uInfo.name}</strong></h5></li>
                                                    <li>{uInfo.address}</li>
                                                    <li>{uInfo.phone}</li>
                                                    <li>{uInfo.email}</li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6 col-lg-3 m-b-20">
                                                <span className="text-muted">Payment Details:</span>
                                                <ul className="list-unstyled invoice-payment-details">
                                                    <li>
                                                        <h5>Total Due: <span className="text-right">${totalCost}</span></h5></li>
                                                    <li>Method: <span>{paymethod}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>SERVICE</th>
                                                        <th className="hidden-xs">DESCRIPTION</th>
                                                        <th>UNIT COST</th>
                                                        <th>QUANTITY</th>
                                                        <th>TOTAL</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Booking</td>
                                                        <td className="hidden-xs">{`From ${dayS} to ${dayE}`}</td>
                                                        <td>${bCost}</td>
                                                        <td>1</td>
                                                        <td>${bCost}</td>
                                                    </tr>

                                                    {service.length !== 0 || service !== null ?
                                                        service.map((eitem, eindex) => {
                                                            return (
                                                                <tr key={`trservice-${eindex}`}>
                                                                    <td>{eindex + 2}</td>
                                                                    <td>{`Service ${eindex + 1}`}</td>
                                                                    <td className="hidden-xs">{eitem.name}</td>
                                                                    <td>${eitem.price}</td>
                                                                    <td>1</td>
                                                                    <td>${eitem.price}</td>
                                                                </tr>)
                                                        })
                                                        : ("")}

                                                </tbody>
                                            </table>
                                        </div>
                                        <div>
                                            <div className="row invoice-payment">
                                                <div className="col-sm-7">
                                                </div>
                                                <div className="col-sm-5">
                                                    <div className="m-b-20">
                                                        <h6>Total due</h6>
                                                        <div className="table-responsive no-border">
                                                            <table className="table m-b-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <th>Subtotal:</th>
                                                                        <td className="text-right">${totalCost}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Tax: <span className="text-regular">(0%)</span></th>
                                                                        <td className="text-right">$0</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Total:</th>
                                                                        <td className="text-right text-primary">
                                                                            <h5>${totalCost}</h5></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="invoice-info">
                                                <h5>Other information</h5>
                                                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed dictum ligula, cursus blandit risus. Maecenas eget metus non tellus dignissim aliquam ut a ex. Maecenas sed vehicula dui, ac suscipit lacus. Sed finibus leo vitae lorem interdum, eu scelerisque tellus fermentum. Curabitur sit amet lacinia lorem. Nullam finibus pellentesque libero, eu finibus sapien interdum vel</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => props.hideInvoice()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}