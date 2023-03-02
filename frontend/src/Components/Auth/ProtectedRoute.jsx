import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({user, children, redirectPath = "/"}) => {
    if(!user){
        return <Navigate to={redirectPath} replace/>
    }
    return children ? children : <Outlet/>;
}

export default ProtectedRoute
