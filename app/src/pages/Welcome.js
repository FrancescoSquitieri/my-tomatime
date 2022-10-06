import React, {Fragment, useContext} from "react";
import { Container, Row } from "react-bootstrap";
import KanbanDone from "../components/Kanban/KanbanDone";
import KanbanPointers from "../components/Kanban/KanbanPointers";
import KanbanToDo from "../components/Kanban/KanbanToDo";
import KanbanTomato from "../components/Kanban/KanbanTomato";
import "../style/Welcome.css";
import {TasksContext} from "../store/tasks/tasks.context";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Welcome = () => {

    const {tasksWorkingAt} = useContext(TasksContext);

  return (
    <Fragment>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
      <KanbanPointers />
      <Container className="mt-5">
        <Row className="position-relative justify-content-center" >
          <KanbanToDo />
          <KanbanTomato />
          <KanbanDone />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Welcome;
