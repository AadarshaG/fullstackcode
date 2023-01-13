import React from 'react';
import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom';
import { Home } from './home/home.component';
import {Login} from './login/login.component';
import { RegisterForm} from './register/register.component';
import { Logout } from './logout/logout.component';
import {Dashboard, PrivateRoute} from '../component/admin/dashboard/dashboard.component';
import { AdminLayout } from './admin/layouts/layout.component';
import { Category} from '../component/admin/category/category.component';
import { CategoryCreate } from './admin/category/category-create.component';
import { CategoryEdit } from './admin/category/category-edit.component';

import * as Product from './admin/product/index';


function UserRoute({children}){
    const is_logged_in = localStorage.getItem('token');

    if(!is_logged_in){
        return <Navigate to="/login"></Navigate>;
    }else{
        let user = JSON.parse(localStorage.getItem('user'));
        if(user.role != 'user'){
            return <Navigate to="/admin"></Navigate>;
        }
        //user
        return children;
    }
}

function UserLayout(){
    return(
        <>  </>
    );
}

 export function AppRouting(){

    return(
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>

 
                <Route path="/login" element={<Login></Login>}> </Route>
                <Route path="/register" element={<RegisterForm></RegisterForm>}></Route>

                <Route path="/admin" element={<PrivateRoute><AdminLayout></AdminLayout></PrivateRoute>}>
                    <Route index element={<Dashboard></Dashboard>}></Route>
                    <Route path="category" element={<PrivateRoute><Category></Category></PrivateRoute>}></Route>
                    <Route path="category/create" element={<PrivateRoute><CategoryCreate></CategoryCreate></PrivateRoute>}></Route>
                    <Route path="category/:id" element={<PrivateRoute><CategoryEdit></CategoryEdit></PrivateRoute>}></Route>

                    <Route path="product" element={<PrivateRoute><Product></Product></PrivateRoute>}></Route>
                    <Route path="product/create" element={<PrivateRoute><Product.ProductCreate></Product.ProductCreate></PrivateRoute>}></Route>
                    <Route path="product/:id" element={<PrivateRoute><Product.ProductEdit/></PrivateRoute>}></Route>


                </Route>

                <Route path="/user" element={<UserRoute><UserLayout></UserLayout></UserRoute>}></Route>

                <Route path="/logout" element={<Logout></Logout>}></Route>
            </Routes>
        </BrowserRouter>
    );
 }