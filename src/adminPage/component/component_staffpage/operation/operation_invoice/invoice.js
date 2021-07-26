import './style.css'
import React, { useRef } from 'react';
import { Modal, Button, ButtonGroup } from "react-bootstrap";
import InvoiceBody from './invoice_body/invoice_body';
import ReactToPrint from 'react-to-print';

export default function Invoice(props) {
    let { id, idroom, idUser, dateStart, dateEnd, codeDiscount, totalCost,
        paymethod, number, service, createdAt, updatedAt, userName, isOpen, findRoomName, findUser } = props;

    const componentRef = useRef();

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
                <InvoiceBody {...props} aref={componentRef} />
                <ButtonGroup aria-label="Basic example">
                <ReactToPrint style={{}}
                    trigger={() => <Button variant="primary">Print this out!</Button>}
                    content={() => componentRef.current}
                />
                <Button variant="danger" onClick={() => props.hideInvoice()}>
                    Close
                </Button>
                </ButtonGroup>
            </Modal.Body>
        </Modal>
    )
}