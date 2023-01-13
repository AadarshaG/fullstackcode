import {FaPen, FaTrash} from 'react-icons/fa';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css'; 
import { NavLink } from 'react-router-dom';

export function GetActions(props){
    return(
        <>
        <NavLink to={props.editUrl} className="btn btn-sm btn-success btn-circle" >
            <FaPen></FaPen> 
        </NavLink>
        &ensp;
         <button className="btn btn-sm btn-danger btn-circle" onClick={(ev)=>{
                                
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
                    return props.onDelete(props.index,props.obj.id)
                }
                })

        //    let confirmed = window.confirm("Are you sure you want to delete thi data?");
        //    if(confirmed){
        //     return deleteItem(index,obj._id)
        //    }
        }}>
            <FaTrash></FaTrash>
        </button></>
    );
}
