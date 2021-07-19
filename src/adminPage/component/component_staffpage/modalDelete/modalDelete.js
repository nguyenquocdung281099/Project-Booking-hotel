import { Modal, Button } from "react-bootstrap";

export default function ModalDelete(props) {
    let {id, isOpen} = props
    return (
        <Modal show={isOpen} onHide={props.hideModalDel}>
            <Modal.Header closeButton onHide={props.hideModalDel}>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this item? </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.hideModalDel()}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => props.deleteConfirm(id)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}