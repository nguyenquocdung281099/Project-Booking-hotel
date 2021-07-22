import { Modal, Button } from "react-bootstrap";

export default function ModalPDelete(props) {
    let {id, isOpen, findUsing, findCode} = props
   
    let code = id? findCode(id) : ""
    let using = code? findUsing(code) : ""

    return (
        <Modal show={isOpen} onHide={props.hideModalDel}>
            <Modal.Header closeButton onHide={props.hideModalDel}>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {using === -1? 
                "Are you sure you want to delete this item?"
                : "This item is in used at booking database"}  
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.hideModalDel()}>
                    Close
                </Button>
                {using === -1? 
                <Button variant="danger" onClick={() => props.deleteConfirm(id)}>
                    Delete
                </Button> : ("")}
            </Modal.Footer>
        </Modal>
    )
}