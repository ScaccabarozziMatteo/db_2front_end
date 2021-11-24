import React, { useEffect, useState } from 'react';
import NavbarHome from "./navbars/NavbarHome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./MainPage.css";
import Buy from "../Pages/Buy";
import Pay from "../Pages/Pay";
import Error from "../Pages/Error";
import Home from "../Pages/Home";
import Logout from '../Pages/Logout';
import Login from '../Pages/LoginPage';
import MenuAppBar from "./components/AvatarUser";
import NavbarEmployee from './navbars/NavbarEmployee';

function MainPage() {
const [role,setRole]=useState();

useEffect (()=>{
console.log(localStorage.getItem("email"));
console.log(localStorage.getItem("username"));
}
)

    return (
        <Router>
           {(role ===true && localStorage.getItem("email")!== " " && localStorage.getItem("username")=== "undefined") ? <NavbarEmployee reload={setRole}/> : <NavbarHome reload={setRole}/>} 
            <Routes>
                <Route path="/" index element={<Home/>}/>
                <Route path="/buy" element={<Buy/>}/>
                <Route path="/pay" element={<Pay/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/*" element={<Error/>}/>
            </Routes>
        </Router>


    )
}

export default MainPage;