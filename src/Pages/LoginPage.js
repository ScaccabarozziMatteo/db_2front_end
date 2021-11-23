import React from "react";
import {Alert} from "@mui/material";

const Login = () =>{
    
    return (
    localStorage.getItem("email")===null || localStorage.getItem("email")==="" ?
    <div>
        <Alert severity='warning'>In order to login, please click on the LOGIN BUTTON in the top-right and enter you credentials.</Alert>
    </div>:
        <div>
            <Alert>
        You are already logged in, {(localStorage.getItem("username")!==" " && localStorage.getItem("username")!==null)? localStorage.getItem("username"): localStorage.getItem("email")}! :)
            </Alert>
        </div>
    )
}

export default Login;