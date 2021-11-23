import React from 'react';
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

function MainPage() {

    return (
        <Router>
            <NavbarHome/>
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