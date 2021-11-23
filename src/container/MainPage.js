import React from 'react';
import NavbarHome from "./navbars/NavbarHome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./MainPage.css";
import Buy from "../Pages/Buy";
import Pay from "../Pages/Pay";
import Error from "../Pages/Error";
import Login from "./Login";


function MainPage() {

    return (
                <NavbarHome/>

       /* <Router>
            <Routes>
                <Route path="/" index element={<Home/>}/>
                <Route path="/buy" element={<Buy/>}/>
                <Route path="/pay" element={<Pay/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/*" element={<Error/>}/>
            </Routes>
        </Router>

        */

    )
}

export default MainPage;