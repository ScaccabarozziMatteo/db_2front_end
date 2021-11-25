import React from 'react'
import MenuList from "./MenuListEmployee";
import {NavLink} from "react-router-dom";
import './NavbarHome.css';
import Profile from '../components/LoginProfile';
import { PinDropSharp } from '@material-ui/icons';

function NavbarEmployee(props) {

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
                    <NavLink exact to="/employee/home" className="logo">
                        TEL<font>CO</font>
                    </NavLink>
                    <ul className="menu-list">{menuList}</ul>
                <Profile reload={props.reload}/>
                </nav>
        )
}

export default NavbarEmployee;