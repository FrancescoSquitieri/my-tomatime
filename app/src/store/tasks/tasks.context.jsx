import { createContext, useEffect, useReducer, useState } from "react";
import client from "../../api/client";

export const TasksContext = createContext({
  tasksDone: [],
  setTasksDone: () => {},
  addTaskDone: () => {},
  removeTaskDone: () => {},
  tasksToDo: [],
  setTasksToDo: () => {},
  addTaskToDo: () => {},
  removeTaskToDo: () => {},
  tasksWorkingAt: [],
  setTasksWorkingAt: () => {},
  addTaskWorkingAt: () => {},
  removeTaskWorkingAt: () => {},
  // token: "",
  // setToken: () => {}
});

const defaultTasksState = {
  tasksDone: [],
  tasksToDo: [],
  tasksWorkingAt: { title: null, description: null, _id: null, userId: null,status:null },
};

const tasksReducer = (state, action) => {
  if (action.type === "GET_TASKS_DONE") {
    return {
      ...state,
      tasksDone: action.tasks,
    };
  }
  if (action.type === "GET_TASKS_TO_DO") {
    return {
      ...state,
      tasksToDo: action.tasks,
    };
  }
  if (action.type === "GET_TASKS_WORKING_AT") {
    return {
      ...state,
      tasksWorkingAt: action.tasks,
    };
  }
  if (action.type === "ADD_TASK_DONE") {
    const newTask = action.task;
    const updatedTasks=[...state.tasksDone];
    updatedTasks.unshift(newTask);
    return {
      ...state,
      tasksDone: updatedTasks,
    };
  }
  if (action.type === "ADD_TASK_TO_DO") {
    const newTask = action.task;
    const updatedTasks=[...state.tasksToDo];
    updatedTasks.unshift(newTask);
    return {
      ...state,
      tasksToDo: updatedTasks,
    };
  }
  if (action.type === "ADD_TASK_WORKING_AT") {
    let newTask = action.task;
    if (state.tasksWorkingAt._id) {
      newTask=state.tasksWorkingAt;
    }


    return {
      ...state,
      tasksWorkingAt: newTask,
    };
  }
  if (action.type === "REMOVE_TASK_DONE") {
    const filteredTasks = state.tasksDone.filter(
      (task) => {
        return task._id !== action.id}
    );
    return {
      ...state,
      tasksDone: filteredTasks,
    };
  }
  if (action.type === "REMOVE_TASK_TO_DO") {
    const filteredTasks = state.tasksToDo.filter(
      (task) => task._id !== action.id
    );
    return {
      ...state,
      tasksToDo: filteredTasks,
    };
  }
  if (action.type === "REMOVE_TASK_WORKING_AT") {
    return {
      ...state,
      tasksWorkingAt: { title: null, description: null, _id: null, userId: null,status:null },
    };
  }
  return defaultTasksState;
};

export const TasksProvider = ({ children }) => {
  const [tasksState, dispatchTasksAction] = useReducer(
    tasksReducer,
    defaultTasksState
  );
 
  const getTasksWorkingAt = (tasksWorkingAt) => {
    dispatchTasksAction({
      type: "GET_TASKS_WORKING_AT",
      tasks: tasksWorkingAt,
    });
  };
  const getTasksToDo = (tasksToDo) => {
    dispatchTasksAction({ type: "GET_TASKS_TO_DO", tasks: tasksToDo });
  };
  const getTasksDone = (tasksDone) => {
    dispatchTasksAction({ type: "GET_TASKS_DONE", tasks: tasksDone });
  };

  const addTaskToDo = (taskToDo) => {
    dispatchTasksAction({ type: "ADD_TASK_TO_DO", task: taskToDo });
  };
  const addTaskDone = (taskDone) => {
    dispatchTasksAction({ type: "ADD_TASK_DONE", task: taskDone });
  };
  const addTaskWorkingAt = (taskWorkingAt) => {
    dispatchTasksAction({ type: "ADD_TASK_WORKING_AT", task: taskWorkingAt });
  };
  const removeTaskToDo = (id) => {
    dispatchTasksAction({ type: "REMOVE_TASK_TO_DO", id: id });
  };
  const removeTaskDone = (id) => {
    dispatchTasksAction({ type: "REMOVE_TASK_DONE", id: id });
  };
  const removeTaskWorkingAt = (id) => {
    dispatchTasksAction({ type: "REMOVE_TASK_WORKING_AT", id: id });
  };

  const value = {
    tasksToDo: tasksState.tasksToDo,
    setTasksToDo: getTasksToDo,
    addTaskToDo,
    removeTaskToDo,
    tasksDone: tasksState.tasksDone,
    setTasksDone: getTasksDone,
    addTaskDone,
    removeTaskDone,
    tasksWorkingAt: tasksState.tasksWorkingAt,
    setTasksWorkingAt: getTasksWorkingAt,
    addTaskWorkingAt,
    removeTaskWorkingAt,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
