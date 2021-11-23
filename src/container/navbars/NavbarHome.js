import React from 'react'
import Login from "../Login";
import SignUpUser from "../SignUpUser";
import MenuList from "./MenuList";
import {NavLink} from "react-router-dom";
import './NavbarHome.css';
import Typography from "@mui/material/Typography";
import {AppBar, Box, Button, Toolbar} from "@material-ui/core";


function NavbarHome() {

    const menuList = MenuList.map(({url, title}, index) => {
        return (
            <React.Fragment key={index}>
                <NavLink activeClassName="active" exact to={url}>
                    <Button idcolor='inherit' size={"large"}>{title}</Button>
                </NavLink>
            </React.Fragment>
        )
    });

  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color={"secondary"}>
            <Toolbar>
                <Typography variant="h6" id='logo' component="div" sx={{flexGrow: 1}}>
                    TEL<font>CO</font>
                </Typography>
                <React.Fragment>{menuList}</React.Fragment>
                <Login/>
                <SignUpUser />
            </Toolbar>
        </AppBar>
    </Box>
  );
}

export default NavbarHome;