import React from "react";
import { Routes, Route } from "react-router-dom";
import {Home} from './pages/Home.jsx'
import Login from './pages/Login.jsx'

export default function MainRoutes() {
  return(
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
  );
}


