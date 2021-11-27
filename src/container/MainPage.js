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
import NavbarEmployee from './navbars/NavbarEmployee';
import HomeEmployee from "../Pages/Employee_Pages/HomeEmployee";
import ReportPage from "../Pages/Employee_Pages/ReportPage";
import Profile from "../Pages/User_Pages/Profile";
import Orders from '../Pages/User_Pages/Orders';
import Cart from '../Pages/User_Pages/Cart';

function MainPage() {
const [role,setRole]=useState();
const [orderId,setOrderId]=useState(true);

useEffect (()=>{
//console.log(localStorage.getItem("email"));
//console.log(localStorage.getItem("username"));
},[orderId]
)

    return (
        <Router>
           {(localStorage.getItem("email")!== " " && localStorage.getItem("username")=== "undefined") ? <NavbarEmployee reload={setRole}/> : <NavbarHome role={role} reload={setRole}/>} 
            <Routes>
                <Route path="/" index element={<Home/>}/>
                <Route path="/employee/home" element={<HomeEmployee/>}/>
                <Route path="/buy" element={<Buy role ={role} setOrderId={setOrderId} reload={setRole}/>}/>
                <Route path="/pay" element={<Pay orderId={orderId} setOrderId={setOrderId}/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/employee/report" element={<ReportPage/>}/>
                <Route path="/orders" element={<Orders orderId={orderId} setOrderId={setOrderId}/>}/>
                <Route path="/cart" element={<Cart orderId={orderId} setOrderId={setOrderId}/>}/>
                <Route path="/*" element={<Error/>}/>
            </Routes>
        </Router>


    )
}

export default MainPage;