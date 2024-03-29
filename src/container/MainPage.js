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
import Orders from '../Pages/User_Pages/Orders';
import Cart from '../Pages/User_Pages/Cart';
import axios from 'axios';

function MainPage() {
const [role,setRole]=useState();
const [orderId,setOrderId]=useState(true);
const [insolvent,setInsolvent] = useState(localStorage.getItem("insolvent")>0? true:false);
const [checkInsolvent,setCheckInsolvent] = useState(false);
useEffect (()=>{
//console.log(localStorage.getItem("email"));
//console.log(localStorage.getItem("username"));
},[orderId]
)

useEffect (()=>{
    localStorage.getItem("user_id")!==""?
    axios.get("/user/getinsolvent",{params:{
        user_id: localStorage.getItem("user_id")
    }}).then((result)=>{
        setInsolvent(result.data>0? true:false)
    })
    :
    setInsolvent(false);
    },[checkInsolvent]
    )



    return (
        <Router>
           {(localStorage.getItem("email")!== " " && localStorage.getItem("username")=== "undefined") ? <NavbarEmployee reload={setRole}/> : <NavbarHome  checkInsolvent={checkInsolvent} setCheckInsolvent={setCheckInsolvent} role={role} reload={setRole}/>} 
            <Routes>
                <Route path="/" index element={<Home insolvent={insolvent} checkInsolvent={checkInsolvent} orderId={orderId} setOrderId={setOrderId}/>}/>
                <Route path="/employee/home" element={<HomeEmployee/>}/>
                <Route path="/buy" element={<Buy checkInsolvent={checkInsolvent} setCheckInsolvent={setCheckInsolvent} role ={role} setOrderId={setOrderId} reload={setRole}/>}/>
                <Route path="/pay" element={<Pay checkInsolvent={checkInsolvent} setCheckInsolvent={setCheckInsolvent} orderId={orderId} setOrderId={setOrderId}/>}/>
                <Route path="/profile" element={<Orders/>}/>
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