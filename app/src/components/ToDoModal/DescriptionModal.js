import "./DescriptionModal.css";
import { Modal, Form, Button, CloseButton } from "react-bootstrap";

const ToDoModal = ({ show, setShow, task }) => {

    const handleClose = () => setShow(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
    >
            <Modal.Header className="border-none">
                <Modal.Title className="container-fluid rubik d-flex flex-row align-item-center justify-content-between">
                    <span className='fw-light mx-3'>Dettaglio del task</span> <span className='text-primary'>{task.title}</span>
                    <CloseButton className='fs-6 mt-1' onClick={handleClose} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="border-none d-flex flex-column p-4">
                <p><span className='rubik text-primary'>Task Title:</span> {task.title}</p>
                <p><span className='rubik text-primary'>Task Description:</span> {task.description}</p>
            </Modal.Body>
    </Modal>
  );
};

export default ToDoModal;