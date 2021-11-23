import React from 'react'
import {Divider, Stack} from "@mui/material";
// import Login from "../Login";
import SignUpUser from "../SignUpUser";
import MenuList from "./MenuList";
import {NavLink} from "react-router-dom";
import './NavbarHome.css';
import { Button } from 'bootstrap';
import Profile from '../components/LoginProfile';
import Login from '../Login';

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