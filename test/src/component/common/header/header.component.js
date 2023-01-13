import {NavLink} from 'react-router-dom';


function CommonNav(){
    return(
        <>
        <li className="nav-link">
            <NavLink style={({isActive})=>{
                return{
                    background:(isActive ? '#ccc' : '#fff')
                }
            }} to="/">Home</NavLink>
        </li>
        </>
    );
}


export function Header(){
    return(
        <header>
            <ul className="nav">
                <CommonNav></CommonNav>
            
                <li className="nav-link">
                    <NavLink style={({isActive})=>{
                        return{
                            background:(isActive ? '#ccc' : '#fff')
                        }
                    }} to="/login">Login</NavLink>
                </li>
                <li className="nav-link">
                    <NavLink style={({isActive})=>{
                        return{
                            background:(isActive ? '#ccc' : '#fff')
                        }
                    }} to="/register">Register</NavLink>
                </li>
            </ul>
        </header>
    );
}

export function AdminHeader(){
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    
    return(
        <header> 
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>

                <ul className="navbar-nav ml-auto">

                    <div className="topbar-divider d-none d-sm-block"></div>

                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">ASD</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}