import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container, Row} from "react-bootstrap";

export const FormCreateTomatoCycle = () => {
    return (
        <Form className='d-flex align-items-center justify-content-center'>
            <Container className='col-4'>
                <Row>
                    <Form.Group className="mb-3 col-2" controlId="formBasicEmail">
                        <Form.Label>Tomato Minutes</Form.Label>
                        <Form.Control type="number" value='0' placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3 col-2" controlId="formBasicEmail">
                        <Form.Label>Tomato Seconds</Form.Label>
                        <Form.Control type="number" value='0' placeholder="Enter email" />
                    </Form.Group>
                </Row>
            </Container>
            <Container className='col-4'>
                <Row>
                    <Form.Group className="mb-3 col-2" controlId="formBasicEmail">
                        <Form.Label>Tomato Minutes</Form.Label>
                        <Form.Control type="number" value='0' placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3 col-2" controlId="formBasicEmail">
                        <Form.Label>Tomato Seconds</Form.Label>
                        <Form.Control type="number" value='0' placeholder="Enter email" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Row>
            </Container>
        </Form>
    )
}