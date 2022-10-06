import React from 'react';

const AuthContext=React.createContext({
    isLoggedIn:localStorage.getItem('token')!==undefined && localStorage.getItem('token')!==null && localStorage.getItem('token')!=='null',
    token: localStorage.getItem('token') || null,
    tasksToDo:[],
    username:null,
    addTask:(token,task)=>{},
    logout:()=>{},
    login:(token)=>{},
    getTasksToDo:(token)=>{},
});

export default AuthContext;