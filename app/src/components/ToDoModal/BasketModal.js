import React, {Fragment, useContext} from "react";
import "./BasketModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import KanbanCardStyle from "../KanbanCard/KanbanCard.module.css";
import {BsCheckCircle} from "react-icons/bs";
import client from "../../api/client";
import AuthContext from "../../store/auth/auth-context";
import {TasksContext} from "../../store/tasks/tasks.context";
import {toast} from "react-toastify";

function BasketModal({open, setOpen, task}) {

    const handleClose = () => setOpen(false);
    const [loader, setLoader] = React.useState(false);
    const {token} = useContext(AuthContext);
    const {removeTaskToDo} = useContext(TasksContext);

    const handleDeleteTsk = async () => {
        try {
            setLoader(true);
            const res = await client.delete(`/api/deleteTask/${task._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(res.status === 204) {
                toast.success('Task Deleted Successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }
            setOpen(false);
            removeTaskToDo(task._id);
        } catch(error) {

        } finally {
            setLoader(false);
        }
    }

    return (
        <Fragment>
            <Modal
                show={open}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modal-70h"
            >
                <Modal.Body className="p-4">
                    <p className="text-primary pt-3 mb-1 fw-semibold">Delete Task</p>
                    <p className="text-muted m-0 p-0">Are you sure you want to delete this task ?</p>

                    {loader && <div>Loading...</div>}

                    <div className='w-100 d-flex align-items-center justify-content-center'>
                        <div className={`rounded-3 mt-4 card-detail col-11`}>
                            <div className={`${KanbanCardStyle.kanbanCardLeftIcon} text-center`}>
                                <BsCheckCircle className='fs-3 text-muted pointer' />
                                <span className={`${KanbanCardStyle.kanbanCardText} text-muted px-3`}>{task.title}</span>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer className="border-none p-4">
                    <Button className="btn-modal-delete-1" onClick={handleClose}>Cancel</Button>
                    <Button className="btn-modal-delete-2" onClick={handleDeleteTsk}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default BasketModal;
