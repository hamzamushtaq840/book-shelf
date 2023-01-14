import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Auth() {
    const location = useLocation()
    const user = useSelector(state => state.user.userInfo);

    return Object.keys(user).length === 0 ? (
        (<Navigate to="/Unauthorized" state={{ from: location }} replace />)
    ) :
        <Outlet />

}
export default Auth;