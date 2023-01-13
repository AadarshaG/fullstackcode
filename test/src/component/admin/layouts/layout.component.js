import { Outlet } from "react-router-dom";
import { AdminHeader } from "../../common/header/header.component";
import { SideNav } from "../sidebar/sidebar.component";

 export function AdminLayout(){
    return(
        <div id="wrapper">
            <SideNav></SideNav>

            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <AdminHeader></AdminHeader>
                    <div className="container-fluid">

                        <Outlet></Outlet>

                    </div>
                </div>
            </div>
            </div>
    );
 }