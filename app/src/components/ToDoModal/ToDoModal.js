import "./ToDoModal.css";
import client from "../../api/client";
import { Modal, Form, Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import useInput from "../../hooks/use-input";
import pencil from "../../img/pencil.svg";
import AuthContext from "../../store/auth/auth-context";
import { TasksContext } from '../../store/tasks/tasks.context';
import {toast} from "react-toastify";

const ToDoModal = ({ show, setShow }) => {
  // const [showAlert, setShowAlert] = useState(false);
  // const [status, setStatus] = useState("");
  // if(status) {
  //   setTimeout(() => {
  //     setShowAlert(false)
  //   }, 3000)
  // }
  const authCtx = useContext(AuthContext);
  const tasksCtx=useContext(TasksContext);
  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== "" && value.trim().length < 50);

  const titleInputClasses = titleInputHasError ? "invalid" : "";

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput((value) => value.trim() !== "");

  const descriptionInputClasses = descriptionInputHasError ? "invalid" : "";

  let formIsValid = enteredTitleIsValid && enteredDescriptionIsValid;

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    const token = authCtx.token;
    // const user=await client.get("/me");
    // console.log(user);

    if (!formIsValid) {
      return;
    }
    let data = {
      title: enteredTitle,
      description: enteredDescription,
      token: token,
    };

    try {
      const newTask = await client.post(`/api/todo`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(newTask.status === 200) {
        toast.success('Task Added Successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      }
      console.log(newTask.data);
      tasksCtx.addTaskToDo(newTask.data);

      // setStatus("success");
      // setShowAlert(true)
    } catch (error) {
      console.log(error.message);
      // setStatus("error");
      // setShowAlert(true)
    }
    setShow(false);
  };
  useEffect(() => {
    if (!show) {
      resetTitleInput();
      resetDescriptionInput();
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      className="modal-70h"
    >
      {/* {
        status === "success" &&  (
              <Alert variant="success" style={{
                position: "fixed",
                top: 10,
                left: "38%",
                right: "62%",
                width: "350px",
                textAlign: "center",
                display: showAlert ? "block" : "none"
              }}>
                <Alert.Heading>Task creato correttamente!</Alert.Heading>
              </Alert>
          ) || status === "error" && (
            <Alert variant="danger" style={{
              position: "fixed",
              top: 10,
              left: "38%",
              right: "62%",
              width: "350px",
              textAlign: "center",
              display: showAlert ? "block" : "none"
            }}>
              <Alert.Heading>Errore interno del server</Alert.Heading>
            </Alert>
        )
      } */}
      <Form onSubmit={formSubmissionHandler}>
        <Modal.Header>
          <Modal.Title className="container-fluid">
            <div
              className={`d-flex container-fluid justify-between ${titleInputClasses}`}
            >
              <img src={pencil} alt="" className={`pencil`} />
              <Form.Control
                className={`title`}
                type="text"
                required
                placeholder="Task Title"
                onChange={titleChangedHandler}
                onBlur={titleBlurHandler}
                value={enteredTitle}
              />
            </div>
            {titleInputHasError && (
              <div className={`${titleInputClasses} mt-3`}>
                <p className="error-text text-center fs-10">
                  Title must not be empty and must be less than 50 characters.
                </p>
              </div>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={`${descriptionInputClasses}`}>
            <Form.Control
              className={`description`}
              as="textarea"
              type="text"
              size="sm"
              placeholder="Description"
              onChange={descriptionChangeHandler}
              onBlur={descriptionBlurHandler}
              value={enteredDescription}
            />
            {descriptionInputHasError && (
              <p className="error-text mt-3">Description must not be empty.</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setShow(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="danger" size="sm">
            Add Task
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ToDoModal;
