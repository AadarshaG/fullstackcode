import React from 'react';
import {ProductForm} from './product-form.component';
import {useNavigate} from 'react-router-dom';
import {success} from '../../../utils/utils';
import {HttpClient} from '../../../utils/httpclient';

class ProductCreateComponent extends React.Component{
    constructor(props){
        super(props);
    }

     addProduct = (data,files) =>{
        const http = new HttpClient();
        http.uploader(data,files, 'POST','product', true)
        .then((resolve) =>{
            success(resolve.msg)
            this.props.navigate('/admin/product')
        })
        .catch((error)=>{
            console.log("Error ", error);
        })

     }


    render(){
        return(
            <>
            <h1>Add Product</h1>
            <hr></hr>
            <ProductForm onSubmitEvent = {this.addProduct} product={{}}></ProductForm>
            </>
        );
    }
}

export function ProductCreate(){
    const navigate = useNavigate();
    return (
        <ProductCreateComponent navigate={navigate}></ProductCreateComponent>
    )
}