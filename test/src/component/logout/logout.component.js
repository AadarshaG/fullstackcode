import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout(){
    const navigate = useNavigate();
    localStorage.clear();

    //navigate('/login');
    useEffect(()=>{
        navigate('/login');
    })

    //return (<></>);
    return null;
}