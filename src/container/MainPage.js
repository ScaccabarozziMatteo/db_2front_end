import React, { useEffect, useState } from 'react';
import NavbarHome from "./navbars/NavbarHome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./MainPage.css";
import Buy from "../Pages/User_Pages/Buy";
import Pay from "../Pages/Pay";
import Error from "../Pages/Error";
import Home from "../Pages/User_Pages/Home";
import Logout from '../Pages/Logout';
import Login from '../Pages/LoginPage';
import CreatePage from '../Pages/Employee_Pages/CreatePage';
import NavbarEmployee from './navbars/NavbarEmployee';
import HomeEmployee from "../Pages/Employee_Pages/HomeEmployee";
import ReportPage from "../Pages/Employee_Pages/ReportPage";

function MainPage() {
const [role,setRole]=useState();

useEffect (()=>{
console.log(localStorage.getItem("email"));
console.log(localStorage.getItem("username"));
}
)

    return (
        <Router>
           {(localStorage.getItem("email")!== " " && localStorage.getItem("username")=== "undefined") ? <NavbarEmployee reload={setRole}/> : <NavbarHome reload={setRole}/>} 
            <Routes>
                <Route path="/" index element={<Home/>}/>
                <Route path="/employee/home" element={<HomeEmployee/>}/>
                <Route path="/buy" element={<Buy/>}/>
                <Route path="/pay" element={<Pay/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/employee/createPackages" element={<CreatePage/>}/>
                <Route path="/employee/report" element={<ReportPage/>}/>
                <Route path="/*" element={<Error/>}/>
            </Routes>
        </Router>


    )
}

export default MainPage;