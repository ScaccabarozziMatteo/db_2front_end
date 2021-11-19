import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LoginUser from "./container/LoginUser";
import {BrowserRouter as Router} from 'react-router-dom';
import indexNavBanner from "./container/indexNavBanner";
import UserHome from "./container/UserHome";

ReactDOM.render(
  <Router>
      <indexNavBanner />
      <UserHome />
      <LoginUser />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
