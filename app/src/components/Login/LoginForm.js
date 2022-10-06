import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Row } from "react-bootstrap";
import { ReactComponent as TomatimeHeader } from "../../assets/tomatime-header-login.svg";
import client from "../../api/client";
import style from './LoginForm.module.css'
import AuthContext from "../../store/auth/auth-context";

const LoginForm = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredFullName,setEnteredFullName]=useState('');
  const [isSignin,setIsSignin]=useState(true);
  const navigate = useNavigate();
  const authCtx=useContext(AuthContext);

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    let data;
    if (isSignin) {
      data={
        username: enteredUsername,
        password: enteredPassword,
      }
    }else{
      data = {
        username: enteredUsername,
        password: enteredPassword,
        fullName: enteredFullName,
      };
    }
    
    try {
      let url;
      let token;
      let username;
      if (isSignin) {
        url='/signin';
      }else{
        url='/signup';
      }
      const resp = await client.post(url, data);
      if (!isSignin) {
        data={
          username: enteredUsername,
          password: enteredPassword,
        }
        const r = await client.post('/signin', data);
        token=r.data.token;
        username=r.data.username;
      }else{
        token = resp.data.token;
        username=resp.data.username;
      }
      localStorage.setItem("token", token);
      const lsToken=localStorage.getItem('token');
      authCtx.login(lsToken,username);
      // console.log(authCtx.token);
      setErrorMessage("")
      navigate("/home");
    } catch (err) {
      setErrorMessage("Email o Password non valida")
    }
  };
  const toggleFormHandler=()=>{
    setIsSignin((state)=>!state);
  };
  
  return (
    <Fragment>
      <Row className=" align-items-center h-100">
        <div className="col-4">
          <Container className="h-100 p-4 z-999">
            <Row className="flex-column align-items-center justify-content-center">
              <div className="mb-5 text-center">
                <TomatimeHeader style={{ width: "380px", height: "64px" }} />
              </div>
              <div className="bg-white login-form rounded-5 mt-5 py-4 px-5 z-999">
                <Row className="flex-column align-items-start">
                  <h2 className="form-login-header text-primary">{isSignin ? 'LOGIN':'REGISTER'}</h2>
                  <Form onSubmit={handleSubmit}>
                    {!isSignin &&
                    <Form.Group className="mb-3">
                      <Form.Control
                        onChange={(e) => {
                          setEnteredFullName(e.target.value);
                        }}
                        value={enteredFullName}
                        required
                        type="text"
                        placeholder="Full Name"
                        className={`mb-3 border-0 border-bottom border-primary rounded-0 border-2 login-input shadow-none px-0 py-2 ${style.input}`}
                      />
                    </Form.Group>
                    }
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        onChange={(e) => {
                          setEnteredUsername(e.target.value);
                        }}
                        value={enteredUsername}
                        required
                        type="text"
                        placeholder="Username"
                        className={`mb-3 border-0 border-bottom border-primary rounded-0 border-2 login-input shadow-none px-0 py-2 ${style.input}`}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        onChange={(e) => {
                          setEnteredPassword(e.target.value);
                        }}
                        value={enteredPassword}
                        required
                        type="password"
                        placeholder="Password"
                        className={`mb-3 border-0 border-bottom border-primary rounded-0 border-2 login-input shadow-none px-0 py-2 ${style.input}`}
                      />
                    </Form.Group>
                    {errorMessage &&
                      <Form.Group>
                        <span className="text-danger">{errorMessage}</span>
                      </Form.Group>
                    }
                    <Container>
                      <Row className="align-items-center justify-content-center">
                        <Button
                          type="submit"
                          variant="success"
                          className="btn-login text-white fs-4 rounded-4 mt-3"
                        >
                          {isSignin ? 'LOGIN':'REGISTER'}
                        </Button>
                      </Row>
                    </Container>
                    <div className="text-primary w-100 not-registered-text mt-5">
                      {isSignin ? 'Not registered yet? ':'have an account? '}
                      <span 
                        className={``}
                      ><button type="button" onClick={toggleFormHandler} className="a bg-transparent d-inline fw-bold text-decoration-underline text-danger border-none span px-0">{isSignin ? 'Register':'Login'} now</button></span>
                    </div>
                  </Form>
                </Row>
              </div>
            </Row>
          </Container>
        </div>
      </Row>
    </Fragment>
  );
};

export default LoginForm;
