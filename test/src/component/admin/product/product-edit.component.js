import React from 'react';
import {ProductForm} from './product-form.component';
import {useNavigate, useParams} from 'react-router-dom';
import {success} from '../../../utils/utils';
import {HttpClient} from '../../../utils/httpclient';
import {error} from '../../../utils/utils';


class ProductEditComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            product: {}
        }
    }

     updateProduct = (data,files) =>{
        let {product} = this.state;
        for(let key in data){
            if(data[key]){
                product[key] = data[key];
            }
        } 
        // product image update ko case
        let submit_data = {};
         Object.keys(product).map((key) => {
            if(key != 'images' ||key != '_id' || key != '__v'){
                submit_data[key] = product[key];
            }
            if(key == 'images'){
                submit_data['old_image'] = product['image'];
            }
        });

        const http = new HttpClient();
        http.uploader(product,files, 'PUT','product/'+product._id, true)
        .then((resolve) =>{
            success(resolve.msg)
            this.props.navigate('/admin/product')
        })
        .catch((error)=>{
            console.log("Error ", error);
        })
     }

     componentDidMount = () =>{
        const http = new HttpClient();
        http.getItemById('/product/'+this.props.id, true)
        .then((response)=>{
            if(response.data.status === true){
                this.setState({
                    product: response.data.data
                })
            }
        })
        .catch((error)=>{
            error(error.data.msg);
        })
     }


    render(){
        return(
            <>
            <h1>Edit Product</h1>
            <hr></hr>
            <ProductForm onSubmitEvent = {this.updateProduct} product={this.state.product}></ProductForm>
            </>
        );
    }
}

export function ProductEdit(){
    const navigate = useNavigate();
    const params = useParams();
    return (
        <ProductEditComponent id={params.id} navigate={navigate}></ProductEditComponent>
    )
}