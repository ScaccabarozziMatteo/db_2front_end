import React from 'react'
import MenuList from "./MenuList";
import {NavLink} from "react-router-dom";
import './NavbarHome.css';
import Profile from '../components/LoginProfile';

function NavbarHome() {

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
                    <div className="logo">
                        TEL<font>CO</font>
                    </div>
                    <ul className="menu-list">{menuList}</ul>
                <Profile/>
                </nav>
        )
}

export default NavbarHome;