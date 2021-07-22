import './style.css'
import { Modal, Button } from "react-bootstrap";

export default function Invoice(props) {
    let { id, idroom, idUser, dateStart, dateEnd, codeDiscount, totalCost,
        paymethod, number, service, createdAt, updatedAt, userName, isOpen, findRoomName, findUser } = props;

    const dayStart = new Date(dateStart)
    let dayS = `${dayStart.getDate()}/${dayStart.getMonth() + 1}/${dayStart.getFullYear()}`
    const dayEnd = new Date(dateEnd)
    let dayE = `${dayEnd.getDate()}/${dayEnd.getMonth() + 1}/${dayEnd.getFullYear()}`
    let uInfo = findUser(idUser)

    let sCost = 0
    service.length !== 0 ? service.forEach((sitem) => sCost = sCost + Number.parseFloat(sitem.price)) : sCost = 0
    let bCost = totalCost - sCost

    let rName = findRoomName(idroom)

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
                                                        <h5><strong>{uInfo.userName}</strong></h5></li>
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
                                                    <li>Discount: <span>{codeDiscount}</span></li>
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
                                                        <td className="hidden-xs">{`Room ${rName} from ${dayS} to ${dayE}`}</td>
                                                        <td>${Number.parseFloat(bCost).toFixed(2)}</td>
                                                        <td>1</td>
                                                        <td>${Number.parseFloat(bCost).toFixed(2)}</td>
                                                    </tr>

                                                    {(service.length !== 0 && service) ?
                                                        service.map((eitem, eindex) => {
                                                            return (
                                                                <tr key={`trservice-${eindex}`}>
                                                                    <td>{eindex + 2}</td>
                                                                    <td>{`Service ${eindex + 1}`}</td>
                                                                    <td className="hidden-xs">{eitem.name}</td>
                                                                    <td>${Number.parseFloat(eitem.price).toFixed(2)}</td>
                                                                    <td>1</td>
                                                                    <td>${Number.parseFloat(eitem.price).toFixed(2)}</td>
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
                                                                        <th>Total:</th>
                                                                        <td className="text-right text-primary">
                                                                            <h5>${Number.parseFloat(totalCost).toFixed(2)}</h5></td>
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