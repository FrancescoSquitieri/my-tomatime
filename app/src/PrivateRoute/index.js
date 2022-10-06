import React from "react"
import { Navigate, useNavigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate=useNavigate();
    if (!token) {
        navigate('/login')
    }
    return token ? children : '';
}

export default PrivateRoute