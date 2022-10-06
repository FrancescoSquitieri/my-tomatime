import React, { Fragment } from "react";
import {Container} from "react-bootstrap";
import '../style/Login.styles.css';
import LoginDesign from "../components/Login/LoginDesign";
import LoginForm from "../components/Login/LoginForm";

export const Login = () => {
    return(
      <Fragment>
        <Container fluid className='vh-100 bg-primary'>
            <LoginForm/>
            <LoginDesign/>
        </Container>
      </Fragment>
    );
}

export default Login