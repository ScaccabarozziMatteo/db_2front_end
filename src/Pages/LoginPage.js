import React from "react";

const Login = () =>{
    
    return (
    localStorage.getItem("email")===null || localStorage.getItem("email")==="" ?
    <div>
        IN ORDER TO LOGIN, PLEASE CLICK ON THE LOGIN BUTTON IN THE TOP-RIGHT AND ENTER YOUR CREDENTIALS.
    </div>:
        <div>
        YOU ARE ALREADY LOGGED IN! {(localStorage.getItem("username")!==" " && localStorage.getItem("username")!==null)? localStorage.getItem("username"): localStorage.getItem("email")} :)
    </div>
    )
}

export default Login;