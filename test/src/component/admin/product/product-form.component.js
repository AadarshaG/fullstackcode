import React from "react";
import {FaPaperPlane, FaTrash} from 'react-icons/fa';
import {HttpClient} from '../../../utils/httpclient';
import {error} from '../../../utils/utils';

const commonFields = {
    name: '',
    price: '',
    discount: '',
    description: '',
    cat_id: '',
    child_cat_id: '',
    is_featured: '',
    status: ''

}

export class ProductForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:{
                ...commonFields
            },
            error:{
                ...commonFields
            },
            allParents: [],
            allChilds: [],
            childCats: [],
            filesToUpload: [],
           // product: this.props.product
           images: []
        }
    }

    handleChange = (e)=>{
        const {name, value, type, files} = e.target;
        // fetch all childs cat after cat select
        if(name === 'cat_id'){
            let currentChild = this.state.allChilds.filter((o) => (o.parent_id === value));
            this.setState = {
                childCats: currentChild
            }
        }
        //TODO: file manage
        if(type == 'file'){
            let filesToUpload = [];
             Object.keys(files).map((key) => {
                filesToUpload.push(files[key]);
             })

             this.setState({
                filesToUpload: filesToUpload
             })
        }




        this.setState((preState) => (
            {
                data:{
                    ...preState.data,
                    [name]: value
                }
            }
        ), () => {
            //TODO: validate
            this.validateForm(name)
        })
    }

    validateForm = fieldName => {
        let errMsg = null
        let {data} = this.state;

        switch(fieldName){
            case "title":
                errMsg = data[fieldName] ? '' : 'Title is rquired.';
                break;
        }

        this.setState((preError) => ({
            error: {
                ...preError.error,
                [fieldName]: errMsg

            }
        }))
    }

    handleSubmit = (ev)=>{
        ev.preventDefault();
       
        this.props.onSubmitEvent(this.state.data, this.state.filesToUpload);
    }

    componentDidMount = () => {
        //axios
        const http = new HttpClient(); 

        http.getItem(`category`, {
            headers: {
                "authorization": localStorage.getItem('token')
            }
        })
        .then((response) => {
            let parent_cats = [];
            let all_childs = [];
            if(response.data.status === true){
                parent_cats = response.data.data.filter((o) => (o.parent_id == null));
                all_childs = response.data.data.filter((o) => (o.parent_id != null));
                this.setState({
                    allParents: parent_cats,
                    allChilds: all_childs
                })
            }
        })
        .catch((error)=>{
            // console.log("Error", error);
            error(error.data.msg);
        })
    }

    deleteImageFromDB = (index) =>{
        let images = this.props.product.image;
        images.splice(index,1);
        this.setState((preState) => ({
            data:{
                images: images
            }
        }))
    }

    render(){
        let {product} = this.props;
        let {image} = product;
        return(
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <form className="form" onSubmit={this.handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Title</label>
                                <div className="col-9">
                                    <input type="text" defaultValue={product?.name} onChange={this.handleChange} name="name" className="form-control form-control-sm" required placeholder="Enter Product Name"></input>
                                    <span className="text-danger">{this.state.error.title}</span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Category</label>
                                <div className="col-9" >
                                   <select  name="cat_id"  onChange={this.handleChange} id="cat_id"
                                    className=" form-control form-control-sm">
                                        <option selected disabled> -- Select Parent category --</option>
                                        {
                                            this.state.allParents.map((o,i)=>(
                                                <option key={i} value={o._id} selected={product && product.cat_id == o._id ? true : false}>
                                                    {o.name}
                                                </option>
                                            ))
                                        }
                                   </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Child Category</label>
                                <div className="col-9" >
                                   <select  name="sub_cat_id" defaultValue={product?.child_cat_id} onChange={this.handleChange} id="sub_cat_id"
                                    className=" form-control form-control-sm">
                                        <option selected disabled> -- Select Child category --</option>
                                        {
                                            this.state.childCats.map((o,i)=>(
                                                <option key={i} value={o._id}>
                                                    {o.name}
                                                </option>
                                            ))
                                        }
                                   </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Description</label>
                                <div className="col-9" >
                                   <textarea onChange={this.handleChange} className="form-control form-control-sm" name="description" rows="6" defaultValue={product?.description}></textarea>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Price</label>
                                <div className="col-9" >
                                    <input type="number" defaultValue={product?.price} onChange={this.handleChange} min="1" className="form-control form-control-sm" name="price" placeholder="Enter Price"></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Discount %</label>
                                <div className="col-9" >
                                    <input type="number" defaultValue={product?.discount} onChange={this.handleChange} className="form-control form-control-sm" name="discount" placeholder="Enter Discount"></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Is Featured</label>
                                <div className="col-9" >
                                    <input type="checkbox" defaultChecked={product && product.is_featured ? true : false} onChange={this.handleChange} className="form-control form-control-sm" name="is_featured" value={1}></input> &ensp; Yes
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Status</label>
                                <div className="col-9" >
                                   <select  name="status" onChange={this.handleChange} defaultValue={product?.status} id="status"
                                    className=" form-control form-control-sm">
                                        <option value="Active"> Active </option>
                                        <option value="Inactive"> Inactive </option>
                                   </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-3">Images</label>
                                <div className="col-9" >
                                    <input type="file" onChange={this.handleChange} name="image" multiple></input> 
                                </div>
                            </div>

                            <div className="form-group row">
                                {
                                     image && image.map((o,i) => (
                                        <div key={i} className="col-3">
                                            <img src={process.env.REACT_APP_IMAGE_URL + o} className="img img-fluid"></img>
                                            <button type="button" className="btn btn-sm btn-danger btn-circle"  onClick={() =>{
                                                return this.deleteImageFromDB(i);
                                            }}>
                                                <FaTrash></FaTrash>
                                            </button>
                                        </div>
                                    ))
                                }
                               {
                                this.state.filesToUpload.map((o,i) => (
                                    <div key={i} className="col-3">
                                        <img src={URL.createObjectURL(o)} className="img img-fluid"></img>
                                        <a className="btn btn-sm btn-danger btn-circle" >
                                                <FaTrash></FaTrash>
                                            </a>
                                    </div>
                                ))
                               }
                            </div>
                            <div className="form-group row mb-3">
                                <div className="offset-3 col-9 ">
                                    <button className="btn btn-sm btn-success" type="submit">
                                        <FaPaperPlane></FaPaperPlane> &ensp;  Add Product
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
}