import React, { useEffect } from 'react';
import {useNavigate, NavLink} from 'react-router-dom';
import {FaPlus} from 'react-icons/fa';
import {HttpClient} from '../../../utils/httpclient';
import { success } from '../../../utils/utils';
import {GetActions} from '../../common/get-btns/action-btns.component';



 class ProductComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            all_products: []
        }
    }

    componentDidMount = () => {
        
        let http = new HttpClient();
         http.getItem('product',{}, true)
         .then((response)=>{
            if(response.data.status === true){
                this.setState({
                    all_products: response.data.data
                })
            }
         })
         .catch((error)=>{
            //
         })
    }

    handleDelete = (index, id) => {
        let http = new HttpClient();
        http.deleteItem('product/'+id, true)
        .then((response) => {
            if(response.data.status === true){
                success(response.data.msg);
                
                // all products fetch where multiple user changes from different side
                http.getItem('product',{}, true)
                .then((response)=>{
                   if(response.data.status === true){
                       this.setState({
                           all_products: response.data.data
                       })
                   }
                })
                .catch((error)=>{
                   //
                })
            }
        })
        .catch((error)=>{
            //
        })
    }
 

    render(){
        return(
            <>
            <h4> All Products
                <NavLink to="/admin/product/create" className={()=> 'float-end btn btn-sm btn-success'}>
                    <FaPlus></FaPlus> &ensp; Add Product
                </NavLink>
            </h4>
            <hr></hr>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <table className="table table-sm table-hover table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.N</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.all_products.map((o,i) => (
                                <tr key={i}>
                                     <td>{i+1}</td>
                                     <td>{o.name}</td>
                                     <td>{o.cat_id?.name}</td>
                                     <td>{o.status}</td>
                                     <td>
                                        <GetActions
                                         editUrl = {'/admin/product/'+o._id}
                                         onDelete={this.handleDelete}
                                         index={i}
                                         id={o._id}
                                        ></GetActions>
                                     </td>
                                 </tr>
                                ))}
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </>
        );
    }
}


export function Product(){
    let navigate = useNavigate();

    //if we want to write code in functional component
    // write below to display product list

    // let [allProducts, setAllProducts] = useState([]);
    // let [isLoading, setIsLoding] = useState(true);

    // useEffect(()=>{
    //     let http = new HttpClient();
    //      http.getItem('product',{}, true)
    //      .then((response)=>{
    //         if(response.data.status === true){
    //             setAllProducts(response.data.data);
    //         }
    //      })
    //      .catch((error)=>{
    //         //
    //      })
    // }, [])


    return <ProductComponent navigate={navigate} ></ProductComponent>
}