import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Landing from './pages/Landing';
import Dashboard from './pages/dashboard'
import RequireAuth from "./components/auth/RequireAuth";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path="/" component={Landing} exact />
      <Route path="/dashboard" component={RequireAuth(Dashboard)} />
      <ToastContainer 
        position="top-right"
        autoClose={2000}/>
    </BrowserRouter >
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();