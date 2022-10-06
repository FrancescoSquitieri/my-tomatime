import React, { useReducer } from 'react'
import AuthContext from './auth-context';

const defaultAuthState={
    isLoggedIn: localStorage.getItem('token')!==null && localStorage.getItem('token')!=='null',
    token:localStorage.getItem('token'),
    username:null,
    tasksToDo:[],
}
const authReducer=(state,action)=>{
    if (action.type==='LOGIN') {
        // if (state.isLoggedIn) {
        //     return defaultAuthState;
        // }
        return {
            ...state,
            isLoggedIn:true,
            token:action.token,
            username:action.username,
        };
    }
    if (!state.isLoggedIn) {
        return defaultAuthState;
    }
    if (action.type==='GET_TASKS_TODO') {
        return {
            ...state,
            tasksToDo:action.tasksToDo,
        }
    }
    if (action.type==='ADD') {
        const oldTasksToDO=state.tasksToDo;
        const newTaskToDo=action.task;
        return {
            ...state,
            tasksToDo:[...oldTasksToDO,newTaskToDo],
        };
    }
    if (action.type==='LOGOUT') {
        return {
            isLoggedIn:false,
            token:null,
            tasksToDo:[],
            username:null,
        };
    }
    return defaultAuthState;
}

const AuthProvider = ({children}) => {
    const [authState,dispatchAuthAction]=useReducer(authReducer,defaultAuthState);
    const loginHandler=(token,username)=>{
        dispatchAuthAction({type:'LOGIN',token:token,username:username});
        // getTasksToDoHandler(token);
    }
    const logoutHandler=()=>{
        localStorage.setItem('token',null);
        dispatchAuthAction({type:'LOGOUT'});
    }
    const addTaskHandler=(token,task)=>{
        dispatchAuthAction({type:'ADD',token:token, task:task});
    }
    const getTasksToDoHandler=(token)=>{
        dispatchAuthAction({type:'GET_TASKS_TODO',token:token});
    }
    const authContext={
        isLoggedIn:authState.isLoggedIn,
        token:authState.token,
        tasksDone:authState.tasksToDo,
        logout:logoutHandler,
        login:loginHandler,
        addTask:addTaskHandler,
        getTasksToDo:getTasksToDoHandler,
    }
  return (
    <AuthContext.Provider value={authContext}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;