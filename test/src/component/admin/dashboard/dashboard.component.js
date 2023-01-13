import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AdminHeader } from "../../common/header/header.component";
import { SideNav } from "../sidebar/sidebar.component";


export function Dashboard(){
    return(
        <h1 className="h3 mb-4 text-gray-800">Blank Page</h1>
    ); 
}


export function PrivateRoute({children}){
    const is_logged_in =localStorage.getItem('token');
    return is_logged_in ? children : <Navigate to="/login"></Navigate>
}

export function Private(){
    return(
        <>
        <AdminHeader></AdminHeader>
        <SideNav></SideNav>
        </>
    );
}