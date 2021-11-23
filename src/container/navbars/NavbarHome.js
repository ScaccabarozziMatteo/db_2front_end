import React from 'react'
import {Divider, Stack} from "@mui/material";
import Login from "../Login";
import SignUpUser from "../SignUpUser";
import {NavLink} from "react-router-dom";
import MenuList from "./MenuList";


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
            <React.Fragment>
                        <nav>
            <div className = "logo">
                TEL<font>CO</font>
            </div>
            <ul className = "menu-list">{menuList}</ul>
            <div>
                {localStorage.getItem("username")}
            </div>
        </nav>
                <Stack divider={<Divider orientation="vertical" flexItem />}
                       direction="row" spacing={3} alignItems="center" alignContent="center">
                    <Login/>
                    <SignUpUser />
                </Stack>

            </React.Fragment>
        )
}

export default NavbarHome;