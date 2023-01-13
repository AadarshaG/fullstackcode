import { NavLink } from "react-router-dom";


export function SideNav(){
    return(
        
         <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3"> Admin Dashboard</div>
            </a>


            <hr className="sidebar-divider my-0"/>


            <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></NavLink>
            </li>


            <hr className="sidebar-divider" />

            <li className="nav-item">
                <NavLink className="nav-link" to="/admin/category">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Category</span></NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to="/admin/product">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Product</span></NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to="">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Order</span></NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to="/user">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>User</span></NavLink>
            </li>
            
            <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Logout</span></NavLink>
            </li>

            </ul>


    );
}