 import React from 'react';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';  

import { error } from '../../utils/utils';
import { Header } from '../common/header/header.component';


const BASE_URL = process.env.REACT_APP_BASE_URL;
// export class Login extends React.Component{
//     constructor(){
//         super();
//         this.state = {
//             email: '',
//             password: '',
//             isSubmitting: false
//         };
//     }

//     handleChange = (e)=>{
//         const { name, value } = e.target;
//         //set value to state
//         this.setState({
//             [name]: value
//         });
//     }

//     handleSubmit = (ev)=>{
//         ev.preventDefault();
//         this.setState({
//             isSubmitting: true
//         })
//     }

//     render(){
//         return(
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-12">
//                         <h4 className="text-center">Login Page</h4>
//                         <hr />
//                     </div>
//                     <div className="col-12">
//                         <form action="" method="post" onSubmit={this.handleSubmit}>
//                             <div className="form-group row mb-3">
//                                 <label className="col-3">Email</label>
//                                 <div className="col-9">
//                                     <input type="email" name="email" onChange={this.handleChange} className="form-control form-control-sm" placeholder="Email" required />
//                                 </div>
//                             </div>
//                             <div className="form-group row mb-3">
//                                 <label className="col-3">Password</label>
//                                 <div className="col-9">
//                                     <input type="password" name="password" onChange={this.handleChange} className="form-control form-control-sm" placeholder="Password" required />
//                                 </div>
//                             </div>
//                             <div className="form-group row mb-3">
//                                 <div className="offset-3 col-9 ">
//                                     <button className="btn btn-sm btn-success" type="submit" disabled={this.state.isSubmitting}>Login</button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>

//             </div>
//         );
//     }
// }


export function Login(){

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const handleChange = (e)=>{
        const {name,type,value} = e.target;
        if(name === 'email'){
            if(value && value.includes('@') && value.includes('.com')){
                setEmailErr('');
            }else{
                setEmailErr('Invalid email format.');
            }
            setEmail(value);
        }
        if(name === 'password'){
            if(value && value.length >= 8){
                setPasswordErr('');
            }else{
                setPasswordErr('Password length does not match.');
            }
            setPassword(value);
        }
    }

    const handleSubmit = (event)=>{
        event.preventDefault();

        //login success
        //  localStorage.setItem('is_logged_in',true);
        // navigate('/dashboard');
        axios.post(`${BASE_URL}auth/login`,{
            email: email,
            password: password
        },{
           headers:{
            "content-type": "application/json"
           }
        })
        .then((response)=>{
            if(!response.data.data){
                //msg
                error('User not found');
            }
            localStorage.setItem('token',response.data.data.token);
            // to display user name in dashboard
            let user = {
                name: response.data.data.user.name,
                email: response.data.data.user.email
            }
            localStorage.setItem('user',JSON.stringify(user));
            navigate('/admin');
        })
        .catch((error)=>{
            //
        });
    }

    useEffect(()=>{
        const logged_in = localStorage.getItem('token');
        if(logged_in){
            navigate('/admin');
        }
    })

    return(
        <>
        <Header></Header>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h4 className="text-center">Login Page</h4>
                    <hr />
                </div>
                <div className="col-12">
                    <form action="" method="post" onSubmit={handleSubmit}>
                        <div className="form-group row mb-3">
                            <label className="col-3">Email</label>
                            <div className="col-9">
                            <input type="email" name="email" onChange={handleChange}  className="form-control form-control-sm" placeholder="Email" required />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label className="col-3">Password</label>
                            <div className="col-9">
                                <input type="password" name="password" onChange={handleChange}   className="form-control form-control-sm" placeholder="Password" required />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <div className="offset-3 col-9 ">
                                <button className="btn btn-sm btn-success" type="submit">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}