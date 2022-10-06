import { useContext, useEffect } from "react";
import client from "../../api/client";
import AuthContext from "../../store/auth/auth-context";
import { TasksContext } from "../../store/tasks/tasks.context";
import { KanbanCard } from "../KanbanCard/KanbanCard";

function KanbanDone() {
  const authCtx = useContext(AuthContext);
  const tasksCtx = useContext(TasksContext);
  const tasksDone=tasksCtx.tasksDone;
  const isLoggedIn=authCtx.isLoggedIn;

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      const fetchTodos = async () => {
        try {
          const task = await client.post(
            "/api/getDoneTasks",
            {},
            {
              headers: {
                Authorization: `Bearer ${authCtx.token}`,
              },
            }
          );
          tasksCtx.setTasksDone(task.data);
        } catch (error) {
          return console.log(error);
        }
      };
      fetchTodos();
    }
  }, []);

  
  let tasksList=<p>Not Found Task To Do</p>;
  if (tasksDone.length>0) {
    tasksList=(
      tasksDone.map(el => (
          <KanbanCard type='done' key={el._id} task={el} />
      ))
    );
  }


    return (
    <div className='kanban-3 me-5'>
      <span className='text-uppercase fw-bold text-center'>done</span>
      <section style={{ height:'423px'}} className='oy-scroll ms-3'>
            {isLoggedIn &&
                tasksList
            }
      </section>
    </div>
    )
  }
export default KanbanDone;