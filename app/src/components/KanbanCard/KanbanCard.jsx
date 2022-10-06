import KanbanCardStyle from "./KanbanCard.module.css";
import { BsCheckCircle } from "react-icons/bs";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { ReactComponent as Check } from "./../../img/done.svg";
import { useContext,useState } from "react";
import client from "../../api/client";
import { TasksContext } from "../../store/tasks/tasks.context";
import AuthContext from "../../store/auth/auth-context";
import {FaTrash} from "react-icons/fa";
import BasketModal from "../ToDoModal/BasketModal";
import DescriptionModal from "../ToDoModal/DescriptionModal";
import {toast, ToastContainer} from "react-toastify";
  

export const KanbanCard = ({task,type}) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);

    const handleOpenModal = () => setIsOpenModal(true);
    const handleOpenDetailModal = () => setIsOpenDetailModal(true);
    const tasksCtx = useContext(TasksContext);
    const authCtx = useContext(AuthContext);

    const errorToastForAlreadyInWorkingAt = () => {
        toast.error('Another task already in WORKING AT', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }

    const {tasksWorkingAt} = tasksCtx;
  

    let checkIcon=<BsCheckCircle className='fs-3 text-muted pointer' />;
    let attributeArrow=(type==='done')? 'rotate-icon' : '';
    let isToDo=(type!=='workingAt') ? 'text-primary':'text-success';
    let multipleCards=(type==='workingAt') ? '':'mb-3';



  
    const nextStatusHandler = async (_id) => {
      try {
        const taskUpdate = await client.put(
          `/api/nextStatus/${task._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authCtx.token}`,
            },
          }
        );
  
        console.log(type);
        if (!type) {
          tasksCtx.removeTaskToDo(task._id);
          tasksCtx.addTaskWorkingAt(taskUpdate.data);
        }else{
          tasksCtx.removeTaskWorkingAt(task.id);
          tasksCtx.addTaskDone(taskUpdate.data)
        }
      } catch (error) {
        return console.log(error);
      }
    };
    const backStatusHandler = async (_id) => {
      try {
        const taskUpdate = await client.put(
          `/api/backStatus/${task._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authCtx.token}`,
            },
          }
        );
  
        if (type==='workingAt') {
          tasksCtx.removeTaskWorkingAt(task._id);
          tasksCtx.addTaskToDo(taskUpdate.data);
        }else{
          tasksCtx.removeTaskDone(task._id);
          tasksCtx.addTaskWorkingAt(taskUpdate.data)
        }
      } catch (error) {
        return console.log(error);
      }
    };
    const changeStatusRightHandler = () => {
      if (type !== "done") {
        nextStatusHandler();
      }
      if(!type && tasksWorkingAt._id) errorToastForAlreadyInWorkingAt();
      if(type === 'done' && tasksWorkingAt._id) errorToastForAlreadyInWorkingAt();
      if (type==='done') {
        backStatusHandler();
      }
    }
    const changeStatusLeftHandler = () => {
      // if (type !== "done") {
      //   nextStatusHandler();
      // }
      if (type==='workingAt') {
        backStatusHandler();
      }
    }

    if (type === "done") {
      checkIcon = <Check />;
    }
    if (type === "workingAt") {
      checkIcon = (
        <FaArrowAltCircleRight
          onClick={changeStatusLeftHandler}
          className={`text-muted fs-3 pointer rotate-icon`}
        />
      );
    }
    return (
        <div className={`${KanbanCardStyle.kanbanCard} rounded-3 ${multipleCards}`}>
            {
                type === 'workingAt' && (
                    <div className={`${KanbanCardStyle.kanbanCardLeftIcon} text-center w-100 justify-content-between`} onClick={handleOpenDetailModal}>
                        {/* <BsCheckCircle className='fs-3 text-muted pointer' /> */}
                        {checkIcon}
                        <span className={`${KanbanCardStyle.kanbanCardText} text-muted fs-6`}>{task.title}</span>
                        <FaArrowAltCircleRight onClick={changeStatusRightHandler} className={`${isToDo} fs-3 pointer ${attributeArrow}`} />
                    </div>
                ) || type === 'done' && (
                    <div className={`${KanbanCardStyle.kanbanCardLeftIcon}`} onClick={handleOpenDetailModal}>
                        {/* <BsCheckCircle className='fs-3 text-muted pointer' /> */}
                        {checkIcon}
                        <span className={`${KanbanCardStyle.kanbanCardText} text-muted px-3 ${KanbanCardStyle.kanbanCardDoneText}`}>{task.title}</span>
                    </div>
                ) || !type && (
                    <div className={`${KanbanCardStyle.kanbanCardLeftIcon}`} onClick={handleOpenDetailModal}>
                        {/* <BsCheckCircle className='fs-3 text-muted pointer' /> */}
                        {checkIcon}
                        <span className={`${KanbanCardStyle.kanbanCardText} text-muted px-3`}>{task.title}</span>
                    </div>
                )
            }
            <div>
                {
                    !type && <FaTrash className={`mx-3 fs-6 text-secondary ${KanbanCardStyle.trashIcon}`} onClick={handleOpenModal}/>
                }
                {
                    type === 'done' && (
                        <FaArrowAltCircleRight onClick={changeStatusRightHandler} className={`${isToDo} fs-3 pointer ${attributeArrow}`} />
                    ) ||
                        !type && (
                            <FaArrowAltCircleRight onClick={changeStatusRightHandler} className={`${isToDo} fs-3 pointer ${attributeArrow}`} />
                        )
                }
            </div>
            <BasketModal open={isOpenModal} setOpen={setIsOpenModal} task={task} />
            {
                !type && <DescriptionModal show={isOpenDetailModal} setShow={setIsOpenDetailModal} task={task} />
            }
        </div>
  
  );
};
