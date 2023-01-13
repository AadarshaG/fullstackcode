import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { HttpClient } from "../../../utils/httpclient";
import { success } from "../../../utils/utils";

export function CategoryForm(props){
    const [title,setTitle] = useState('');
    const [parentId, setParentId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [allCats, setAllCats] = useState([]);
    const http = new HttpClient();

    useEffect(()=>{
        
        if(props.data){
            setTitle(props.data.name);
            setParentId(props.data.parent_id);
        }

        http.getItem(`category`,{
            headers:{
                "authorization": localStorage.getItem('token')
            }
        })
        .then((response)=>{
            if(!response.data.data){
                toast.error("No Category Found.");
            }
            let parent_cats = response.data.data.filter((obj)=>(obj.parent_cats));

            setAllCats(parent_cats);
            setIsLoading(false);
        })
    },[isLoading]);

    const handleSubmit = (ev)=>{
        ev.preventDefault();

        props.onHandleSubmit({
            name: title,
            is_parent: (parentId ? false : true),
            parent_id: parentId ? parentId : null
        })
    }


    return (
        <>
            <h4> Category Form</h4>
            <hr></hr>
            <div className="container-fluid">
                <div classNmae="row">
                    <div className="col-12">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Title</label>
                                <div className="col-9">
                                    <input type="text" name="title" value={title || ''} onChange={(e)=>{
                                        const {value} = e.target;
                                        setTitle(value);
                                    }} className="form-control form-control-sm" required placeholder="Enter Category Name"></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Child Of</label>
                                <div className="col-9" >
                                   <select  name="parent_id" id="parent_id"
                                   onChange={(e)=>{
                                    setParentId(e.target.value);
                                     }} value={parentId ? parentId : ''} className=" form-control form-control-sm">
                                        <option selected disabled> -- Select Parent category --</option>
                                        {
                                            allCats.map((obj,index)=>(
                                                <option key={index} value={obj._id}>
                                                    {obj.name}
                                                </option>
                                            ))
                                        }
                                   </select>
                                </div>
                            </div>
                            <div id="childCats"></div>
                            <div className="form-group row mb-3">
                                <div className="offset-3 col-9 ">
                                    <button className="btn btn-sm btn-success" type="submit">
                                        <FaPaperPlane></FaPaperPlane> &ensp; {props.data ? 'Update' : 'Add'} Category
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}