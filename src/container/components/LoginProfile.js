import React from "react";

import react, {useEffect, useState} from 'react';
import Login from "../Login";



const LoginProfile = (props) =>{

    const [isLoggedIn,setIsLoggedIn] = useState();


    function logout(){

        localStorage.setItem("user_id","");
        localStorage.setItem("email","");
        localStorage.setItem("username","");
        setIsLoggedIn(false);
    }

    return (
    isLoggedIn? 
    <button onClick={logout}>
Ciao 
 {
 localStorage.getItem("username")!==null ? localStorage.getItem("username") : localStorage.getItem("email")
 } !
 </button>
 :
 <Login vat={isLoggedIn} onLogChange={setIsLoggedIn}/>
)
}


export default LoginProfile;