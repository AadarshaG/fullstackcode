import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HttpClient } from "../../../utils/httpclient";
import { CategoryForm } from "./category-form.component";
import { success } from "../../../utils/utils";


export function CategoryEdit(){
    const http = new HttpClient();
    const navigate = useNavigate();

    const [data, setData] = useState({});
    const [is_loading,setIsLoading] = useState(true);
    const param = useParams();

    useEffect(()=>{
        http.getItemById(`category/`+param.id,true)
        .then((response)=>{
            if(response.data.status == 200){
                setData(response.data.data);
            }
        })
        .catch((error)=>{
            //
        })
    }, [is_loading]);

    const edit = (data)=>{
        http.updateItem('category/'+param.id,data,true)
        .then((response)=>{
            if(response.data.status == true){
                success(response.data.msg);
                navigate('/admin/category');
            }else{
                //
            }
        })
        .catch((error)=>{
            //
        })
    }
    return (
        <CategoryForm onHandleSubmit={edit} data={data}></CategoryForm>
    );
}