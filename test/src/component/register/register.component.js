//  import React from 'react';

// const commonFields = {
//     name: '',
//     email: '',
//     password: '',
//     password_confirmation: '',
//     gender: ''
// }

// export class Register extends React.Component{
//     constructor(){
//         super();
//         this.state = {
//             data: {
//                ...commonFields
//             },
//             error: {
//                 ...commonFields
//             },
//             isSubmittingForm: false
//         };
//     }

//     handleChange = (e)=>{
//         const { name, value, checked } = e.target;
//         //set value to state and validate
//         this.setState((preState) => {
//             return {
//                 data: {
//                     ...preState.data,
//                     [name]: value
//                 }
//             }
//         }, () => {
//             this.validateForm(name);
//         });
//     }

//     validateForm = fieldName => {
//         //validation logic
//         let errMsg = null;
//         const { data } = this.state;
//         switch(fieldName){
//             case 'name': 
//                 errMsg = data[fieldName] !== '' ? '': "Name is required.";
//                 break;
//             case 'email': 
//                 errMsg = data[fieldName] !== '' ? (data[fieldName].includes('@') ? '': "Invalid Email format."): "Email is required.";
//                 break;
//             case 'password': 
//                 errMsg = data[fieldName] !== '' ? 
//                             (data[fieldName].length >= 8) ? '' : "Password must be 8 character long."
//                         : "Password is required.";
//                 break;
//             case 'password_confirmation': 
//                 errMsg = data[fieldName] !== '' ? 
//                             (data['password'] === data[fieldName]) ? '' : "Password does not match"
//                             : "Name is required.";
//                 break;
//             case 'gender': 
//                 errMsg = data[fieldName] !== ''  ? '': "Gender is required.";
//                 break;
//         }

//         this.setState((preErr)=>({
//             error: {
//                 ...preErr.error,
//                 [fieldName]: errMsg
//             }
//         }), ()=>{
//             const {error} = this.state;
//             let error_count = 0;
//             for(let key in commonFields){
//                 if(error[key]){
//                     error_count++;
//                 }
//             }
//             this.setState({
//                 isSubmittingForm: (error_count !== 0) ? true : false 
//             })
//         })
//     }

//     handleSubmit = (ev)=>{
//         ev.preventDefault();
//         for(let key in commonFields){
//            this.validateForm(key);
//         }
//     }

//     render(){
//          const {error} = this.state;
//         return(
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-12">
//                         <h4 className="text-center">Register Page</h4>
//                         <hr />
//                     </div>
//                     <div className="col-12">
//                         <form action="" method="post" onSubmit={this.handleSubmit}>
//                             <div className="form-group row mb-3">
//                                 <label className="col-3">Name</label>
//                                 <div className="col-9">
//                                     <input type="text" name="name" onChange={this.handleChange} className="form-control form-control-sm" placeholder="Name" required />
//                                     <span className="text-danger">{error.name}</span>
//                                 </div>
//                             </div>
//                             <div className="form-group row mb-3">
//                                 <label className="col-3">Email</label>
//                                 <div className="col-9">
//                                     <input type="email" name="email" onChange={this.handleChange} className="form-control form-control-sm" placeholder="Email" required />
//                                     <span className="text-danger">{error.email}</span>
//                                 </div>
//                             </div>
//                             <div className="form-group row mb-3">
//                                 <label className="col-3">Password</label>
//                                 <div className="col-9">
//                                     <input type="password" name="password" onChange={this.handleChange} className="form-control form-control-sm" placeholder="Password" required />
//                                     <span className="text-danger">{error.password}</span>
//                                 </div>
//                             </div>
//                             <div className="form-group row mb-3">
//                                 <label className="col-3">Confirm-Password</label>
//                                 <div className="col-9">
//                                     <input type="password" name="password_confirmation" onChange={this.handleChange} className="form-control form-control-sm" placeholder="Re-Password" required />
//                                     <span className="text-danger">{error.password_confirmation}</span>
//                                 </div>
//                             </div>
//                             <div className="form-group row mb-3">
//                                 <label className="col-3">Gender</label>
//                                 <div className="col-9">
//                                     <label htmlFor="male">
//                                         <input type="radio" name="gender" onChange={this.handleChange} value={'Male'} id="male" /> Male
//                                     </label>
//                                     <label htmlFor="female">
//                                         <input type="radio" name="gender" onChange={this.handleChange} value={'Female'} id="female" /> Female
//                                     </label>
//                                     <label htmlFor="other">
//                                         <input type="radio" name="gender" onChange={this.handleChange} value={'Other'} id="other" /> Other
//                                     </label>
//                                     <span className="text-danger">{error.gender}</span>
//                                 </div>
//                             </div>
//                             <div className="form-group row mb-3">
//                                 <div className="offset-3 col-9 ">
//                                     <button className="btn btn-sm btn-success" type="submit" disabled={this.state.isSubmittingForm}>Register</button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>

//             </div>
//         );
//     }
// }



import React from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
import { success, error } from '../../utils/utils';
import { HttpClient } from '../../utils/httpclient';

import {FaPlus} from 'react-icons/fa';

const commonFields = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    gender: ''
}

export class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: {
               ...commonFields
            },
            error: {
                ...commonFields
            },
            isSubmittingForm: false
        };
    }

    handleChange = (e)=>{
        const { name, value, checked } = e.target;
        //set value to state and validate
        this.setState((preState) => {
            return {
                data: {
                    ...preState.data,
                    [name]: value
                }
            }
        }, () => {
            this.validateForm(name);
        });
    }

    validateForm = fieldName => {
        //validation logic
        let errMsg = null;
        const { data } = this.state;
        switch(fieldName){
            case 'name': 
                errMsg = data[fieldName] !== '' ? '': "Name is required.";
                break;
            case 'email': 
                errMsg = data[fieldName] !== '' ? (data[fieldName].includes('@') ? '': "Invalid Email format."): "Email is required.";
                break;
            case 'password': 
                errMsg = data[fieldName] !== '' ? 
                            (data[fieldName].length >= 8) ? '' : "Password must be 8 character long."
                        : "Password is required.";
                break;
            case 'password_confirmation': 
                errMsg = data[fieldName] !== '' ? 
                            (data['password'] === data[fieldName]) ? '' : "Password does not match"
                            : "Name is required.";
                break;
            case 'gender': 
                errMsg = data[fieldName] !== ''  ? '': "Gender is required.";
                break;
        }

        this.setState((preErr)=>({
            error: {
                ...preErr.error,
                [fieldName]: errMsg
            }
        }), ()=>{
            const {error} = this.state;
            let error_count = 0;
            for(let key in commonFields){
                if(error[key]){
                    error_count++;
                }
            }
            this.setState({
                isSubmittingForm: (error_count !== 0) ? true : false 
            })
        })
    }

    handleSubmit = (ev)=>{
        ev.preventDefault();
        this.setState({
            isSubmittingForm: true
        })
        for(let key in commonFields){
           this.validateForm(key);
        }
        //axios
        // axios.post(`${process.env.REACT_APP_BASE_URL}user`,
        //     this.state.data,
        //     {
        //         headers:{
        //             "content-type": "application/json"
        //         }
        //     }
        // )
        const http = new HttpClient();
        http.postItem('user',this.state.data,{
            "content-type": "application/json"
        })
        .then((response)=>{
            if(response.data.status === 200){
                success(response.data.msg);
                this.setState({
                    isSubmittingForm: false
                })
                this.props.navigate('/login');
            }else{
                error(response.data.msg);
            }
        })
        .catch((error)=>{
            // 
        })
    }

    render(){
         const {error} = this.state;
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h4 className="text-center">Register Page</h4>
                        <hr />
                    </div>
                    <div className="col-12">
                        <form action="" method="post" onSubmit={this.handleSubmit}>
                            <div className="form-group row mb-3">
                                <label className="col-3">Name</label>
                                <div className="col-9">
                                    <input type="text" name="name" onChange={this.handleChange} className="form-control form-control-sm" placeholder="Name" required />
                                    <span className="text-danger">{error.name}</span>
                                </div>
                            </div>
                            <div className="form-group row mb-3">
                                <label className="col-3">Email</label>
                                <div className="col-9">
                                    <input type="email" name="email" onChange={this.handleChange} className="form-control form-control-sm" placeholder="Email" required />
                                    <span className="text-danger">{error.email}</span>
                                </div>
                            </div>
                            <div className="form-group row mb-3">
                                <label className="col-3">Password</label>
                                <div className="col-9">
                                    <input type="password" name="password" onChange={this.handleChange} className="form-control form-control-sm" placeholder="Password" required />
                                    <span className="text-danger">{error.password}</span>
                                </div>
                            </div>
                            <div className="form-group row mb-3">
                                <label className="col-3">Confirm-Password</label>
                                <div className="col-9">
                                    <input type="password" name="password_confirmation" onChange={this.handleChange} className="form-control form-control-sm" placeholder="Re-Password" required />
                                    <span className="text-danger">{error.password_confirmation}</span>
                                </div>
                            </div>
                            <div className="form-group row mb-3">
                                <label className="col-3">Gender</label>
                                <div className="col-9">
                                    <label htmlFor="male">
                                        <input type="radio" name="gender" onChange={this.handleChange} value={'Male'} id="male" /> Male
                                    </label>
                                    <label htmlFor="female">
                                        <input type="radio" name="gender" onChange={this.handleChange} value={'Female'} id="female" /> Female
                                    </label>
                                    <label htmlFor="other">
                                        <input type="radio" name="gender" onChange={this.handleChange} value={'Other'} id="other" /> Other
                                    </label>
                                    <span className="text-danger">{error.gender}</span>
                                </div>
                            </div>
                            <div className="form-group row mb-3">
                                <div className="offset-3 col-9 ">
                                    <button className="btn btn-sm btn-success" type="submit" disabled={this.state.isSubmittingForm}>
                                        <FaPlus></FaPlus>
                                        Register
                                        </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}


export function RegisterForm(){
    const navigate = useNavigate();
    return (<Register navigate={navigate}></Register>)
}