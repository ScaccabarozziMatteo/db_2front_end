import React from 'react';
import NavbarHome from "./navbars/NavbarHome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginUser from './LoginUser';
import Navbar from './navbars/Navbar';
import "./MainPage.css";
import Home from './Pages/Home';
import Buy from './Pages/Buy';
import Pay from './Pages/Pay';
import Error from './Pages/Error';

const MainPage = () => {
 

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" exact element = {<Home/>} />
        <Route path="/buy" exact element = {<Buy/>} />
        <Route path="/pay"exact element = {<Pay/>} />
        <Route path="/login" exact element = {<LoginUser/>} />
        <Route path="/*"   element = {<Error/>} />
      </Routes >
    </Router>

  );
}

export default MainPage;