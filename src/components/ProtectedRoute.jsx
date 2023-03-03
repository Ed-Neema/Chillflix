import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const ProtectedRoute = ({children}) => {
    const {user} = UserAuth();
    if(!user){//if user is null, take them to 
        return <Navigate to={'/'}/>
    } else{
        return children
    }
}

export default ProtectedRoute
