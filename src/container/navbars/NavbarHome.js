import React, { useEffect, useState } from 'react'
import MenuList from "./MenuList";
import {NavLink} from "react-router-dom";
import './NavbarHome.css';
import Profile from '../components/LoginProfile';

function NavbarHome(props) {
const [role,setRole]=useState();

useEffect(()=>{
    console.log(role);
    setRole(props.role);
    console.log(role);
})

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
                    <NavLink exact to="/" className="logo">
                        TEL<font>CO</font>
                    </NavLink>
                    <ul className="menu-list">{menuList}</ul>
                <Profile role={props.role} reload={props.reload}/>
                </nav>
        )
}

export default NavbarHome;