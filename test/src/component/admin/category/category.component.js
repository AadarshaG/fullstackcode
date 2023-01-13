
import { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import { toast } from 'react-toastify';
import { HttpClient } from '../../../utils/httpclient';
import {FaPen, FaTrash, FaPlus} from 'react-icons/fa';
import { success,error } from '../../../utils/utils';
import { GetActions } from '../../common/get-btns/action-btns.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css'; 

//import DataTable from 'react-data-table-component';


// function GetActions(props){
//     return(
//         <>
//         <button className="btn btn-sm btn-success btn-circle" >
//             <FaPen></FaPen> 
//         </button>
//         &ensp;
//          <button className="btn btn-sm btn-danger btn-circle" onClick={(ev)=>{
                                
//             Swal.fire({
//                 title: 'Are you sure?',
//                 text: "You won't be able to revert this!",
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#3085d6',
//                 cancelButtonColor: '#d33',
//                 confirmButtonText: 'Yes, delete it!'
//                 }).then((result) => {
//                 if (result.isConfirmed) {
//                     return props.onDelete(props.index,props.obj.id)
//                 }
//                 })

//         //    let confirmed = window.confirm("Are you sure you want to delete thi data?");
//         //    if(confirmed){
//         //     return deleteItem(index,obj._id)
//         //    }
//         }}>
//             <FaTrash></FaTrash>
//         </button></>
//     );
// }



export function Category(){
    let [allCats, setAllCats] = useState([]);
    const http = new HttpClient();
    const [is_loading, setIsLoading] = useState(true);

    //datatable implementation
    // const columns = [
      
    //    {
    //     name: 'Title',
    //     selector: row=>row.name,
    //    },
    //    {
    //     name: 'Is Parent',
    //     selector: row=>row.is_parent,
    //    },
    //    {
    //     name: 'Action',
    //     selector: row=>row.actions,
    //    }
    // ];

    useEffect(()=>{
        http.getItem(`category`,{
           headers:{
            "authorization": localStorage.getItem('token') 
           }
        })
        .then((response)=>{
            if(!response.data.data)
            {
                toast.error("Category not found.");
            }
            // map all data to show data in databales for parentid 
            // allCats = response.data.data.map((o, index)=>{
            //     o.is_parent = (o.is_parent ) ? 'Yes' : 'No'
            //     o.actions = <GetActions onDelete={deleteItem} index={index} id={o._id}></GetActions>
            //     return o;
            // })

            allCats = response.data.data.map((o, index)=>{
                o.is_parent = (o.is_parent ) ? 'Yes' : 'No'
                o.actions = <GetActions onDelete={deleteItem} 
                index={index} id={o._id} editUrl= {"/admin/category/"+ o._id}></GetActions>
                return o;
            })


            setAllCats(response.data.data);
            setIsLoading(false);
            
        })
        .catch((error)=>{
            //
        })
    },[is_loading])
    
    const deleteItem = (index,id)=>{
        http.deleteItem(`category/`+id,true)
        .then((response)=>{
            if(response.data.status === true){
                success(response.data.msg);

                // if datatable is not use uncomment below two lines of code and remove isLoading true wala
                 allCats = allCats.filter((ob, i) => (i != index));
                 setAllCats(allCats);

                //window.location.href = window.location.href;

                // for datatable refresh to show delete or update item
                setIsLoading(true);
            }else{
                error(response.data.msg);
            }
        })
        .catch((error)=>{
            //
        }) 
    }


    return(
        <>
        <h4>All Categories
            <NavLink to="/admin/category/create" className={()=>'float-end btn btn-sm btn-success'}>
                <FaPlus></FaPlus> &ensp; Add Category
            </NavLink>
            </h4> 
        <hr></hr>
        {/* <DataTable
            columns={columns}
            data={allCats} 
        ></DataTable> */}
        <table className='table table-sm table-hover table-border'>
            <thead className='table-dark'>
              <tr>
                <th>S.N</th>
                <th>Title</th>
                <th>Is Parent</th>
                <th>Action</th>
              </tr> 
            </thead>
            <tbody>
                {allCats.map((obj,index)=> (
                   
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{obj.name}</td>
                        <td>{obj.is_parent ? 'Yes' : 'No'}</td>
                        <td>
                            <button className="btn btn-sm btn-success btn-circle" >
                                <FaPen></FaPen>
                            </button>
                            &ensp;
                            <button className="btn btn-sm btn-danger btn-circle" value={obj._id} onClick={(ev)=>{
                                
                                Swal.fire({
                                    title: 'Are you sure?',
                                    text: "You won't be able to revert this!",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Yes, delete it!'
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                        return deleteItem(index,obj._id)
                                    }
                                  })

                            //    let confirmed = window.confirm("Are you sure you want to delete thi data?");
                            //    if(confirmed){
                            //     return deleteItem(index,obj._id)
                            //    }
                            }}>
                                <FaTrash></FaTrash>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}


