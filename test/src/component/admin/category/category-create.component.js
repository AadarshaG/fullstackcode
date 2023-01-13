import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HttpClient } from "../../../utils/httpclient";
import { CategoryForm } from "./category-form.component";
import { success } from "../../../utils/utils";


export function CategoryCreate(){
    const http = new HttpClient();
    const navigate = useNavigate();

    const add = (data)=>{
        // add category
        http.postItem(`category`,data,{
            "content-type": "application/json",
            "headers":{
                "authorization": localStorage.getItem('token')
            }
        })
        .then((response)=>{
            if(response.data.status){
                success(response.data.msg);
                navigate('/admin/category');
            }
        })
        .catch((error)=>{
            //
        })
    }
    return (
        <CategoryForm onHandleSubmit={add} dataId={null}></CategoryForm>
    );
}