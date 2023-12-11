import React from 'react';
import { Route, Navigate } from "react-router-dom";
// import { checkLoginToken } from '../../helpers/login'

export const AuthGuard = (Component) => {
    const [storagecheck, setstoragecheck] = React.useState(localStorage.getItem("token"));
    const [storagecheck2, setstoragecheck2] = React.useState(localStorage.getItem("id"));
    return storagecheck == null && storagecheck2 == null ? <Navigate to='/login' /> : <Component />
}

