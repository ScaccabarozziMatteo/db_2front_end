import react from "react";
import { Link, NavLink } from "react-router-dom";
import MenuList from "./MenuList";
import "./Navbar.css";


const Navbar = () =>{
    
    const menuList = MenuList.map(({ url, title }, index) =>{
        return(
            <li key = {index}>
                <NavLink activeClassName="active" exact to={url} >
                    {title}
                </NavLink>
            </li>
        )
    });

    return (
        <nav>
            <div className = "logo">
                TEL<font>CO</font>
            </div>
            <ul className = "menu-list">{menuList}</ul>
            <div>
                {localStorage.getItem("username")}
            </div>
        </nav>
    )
}

export default Navbar;