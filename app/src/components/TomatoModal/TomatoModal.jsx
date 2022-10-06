import React, {Fragment, useContext} from "react";
import Modal from "react-bootstrap/Modal";
import KanbanCardStyle from "../KanbanCard/KanbanCard.module.css";
import {BsCheckCircle} from "react-icons/bs";
import Button from "react-bootstrap/Button";
import client from "../../api/client";
import {TomatoContext} from "../../store/tomato/tomato.context";
import AuthContext from "../../store/auth/auth-context";

export const TomatoModal = ({open, setOpen, setStatusTomato }) => {

    const handleClose = () => setOpen(false);

    const {setRefetchData, setBreakedTomato} = useContext(TomatoContext);
    const {token} = useContext(AuthContext);

    const handleBreakTomato = async () => {
        try {
            const startBreak = await client.post('/api/breakTomato', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (startBreak.status === 200) {
           
                setOpen(false);
                setRefetchData(true);
                setStatusTomato('');
                setBreakedTomato(true);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Fragment>
            <Modal
                show={open}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modal-70h"
            >
                <Modal.Body className="p-4">
                    <p className="text-primary pt-3 mb-1 fw-semibold">Stop Tomato</p>
                    <p className="text-muted m-0 p-0">Do you want to restart another tomato?</p>

                </Modal.Body>
                <Modal.Footer className="border-none p-4">
                    <Button className="btn-modal-delete-1" onClick={handleClose}>Cancel</Button>
                    <Button className="btn-modal-delete-2" onClick={handleBreakTomato}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}