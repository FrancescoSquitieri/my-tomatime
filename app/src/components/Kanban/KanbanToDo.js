import styles from './KanbanToDo.module.css';
import {KanbanCard} from "../KanbanCard/KanbanCard";
import {AddTodoCard} from "../KanbanCard/AddTodoCard/AddTodoCard";
import {useContext, useEffect} from "react";
import {TasksContext} from "../../store/tasks/tasks.context";
import AuthContext from '../../store/auth/auth-context';
import client from '../../api/client';


const KanbanToDo=()=> {
    const authCtx = useContext(AuthContext);
    const tasksCtx = useContext(TasksContext);
    const tasksToDo=tasksCtx.tasksToDo;
    const isLoggedIn=authCtx.isLoggedIn;
  
    useEffect(() => {
      if (authCtx.isLoggedIn) {
        const fetchTodos = async () => {
          try {
            const task = await client.post(
              "/api/getTodoTasks",
              {},
              {
                headers: {
                  Authorization: `Bearer ${authCtx.token}`,
                },
              }
            );
            // console.log(task.data)
            tasksCtx.setTasksToDo(task.data);
          } catch (error) {
            return console.log(error);
          }
        };
        fetchTodos();
      }
    }, []);


    let tasksList=<p>Not Found Task To Do</p>;

    if (tasksToDo.length>0) {
        tasksList=(
            tasksToDo.map(el => {
                
                return <KanbanCard key={el._id} task={el} />
            }
            )
        );
    }
    

    return (
    <div className={`kanban-1 ms-5`} >
          <span className='text-uppercase fw-bold  text-center '>todo</span>
            {isLoggedIn && 
            <section style={{ maxHeight:'370px'  }} className={`oy-scroll ${tasksToDo.length<=0 ? 'd-none':''}`}>
                {tasksList}
            </section>
            }
          <AddTodoCard />

    </div>
    )
}
export default KanbanToDo;