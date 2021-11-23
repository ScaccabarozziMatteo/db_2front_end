import React from "react";

import react, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import Login from "../Login";

import "./LoginProfile.css";


const LoginProfile = (props) =>{

    function logout(){

        localStorage.setItem("user_id","");
        localStorage.setItem("email","");
        localStorage.setItem("username","");
        setIsLoggedIn(false);
    }
    

    const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem("email")!=="" && localStorage.getItem("email")!==null);



    return (
    isLoggedIn? 
    <NavLink exact to = "/" onClick={logout} className="bibi">
Ciao 
 {
 localStorage.getItem("username")!==null ? localStorage.getItem("username") : localStorage.getItem("email")
 } !
 </NavLink>
 :
 <Login vat={isLoggedIn} onLogChange={setIsLoggedIn}/>
)
}


export default LoginProfile;