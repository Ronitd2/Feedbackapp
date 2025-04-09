import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Feedback from './Pages/Feedback'
import Home from './Pages/Home'
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}> </Route>
      <Route path="/feedback" element={<Feedback />}> </Route>
      <Route path="/login" element={<Login/>}> </Route>
      <Route path="/signup" element={<Signup />}> </Route> 
    </Routes>
    </>
  )
}

export default App
