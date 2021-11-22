import React from 'react';
import NavbarHome from "./navbars/NavbarHome";
import {Route, Router, Routes} from "react-router-dom";
import Home from "../Pages/Home";
import "./MainPage.css";
import Buy from "../Pages/Buy";
import Pay from "../Pages/Pay";
import Error from "../Pages/Error";
import Login from "./Login";


function MainPage() {

    return (
        <Router>
            <NavbarHome/>
            <Routes>
                <Route path="/" index element={<Home/>}/>
                <Route path="/buy" element={<Buy/>}/>
                <Route path="/pay" element={<Pay/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/*" element={<Error/>}/>
            </Routes>
        </Router>

    );
}

export default MainPage;