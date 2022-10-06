import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {TabsForCanvasFormCustomizeTomato} from "../TabsForCanvasFormCustomizeTomato/TabsForCanvasFormCustomizeTomato";
import OffCanvasStyle from "./OffCanvasFormCustomizeTomato.module.css";
import {Button} from "react-bootstrap";

export const OffCanvasFormCustomizeTomato = ({show, setShow}) => {
    const handleClose = () => setShow(false);

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} className='w-100'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Customization Menu Tomato</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <TabsForCanvasFormCustomizeTomato />
                    <div className={`${OffCanvasStyle.closeButtonContainer}`}>
                        <Button variant='secondary' onClick={handleClose}>
                            CLOSE
                        </Button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}