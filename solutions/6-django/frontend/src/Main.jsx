import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Registration from './pages/Registration';
import Profile from './pages/Profile';

import Navbar from './pages/Navbar';

import './style.css'

const Main = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="register/" element={<Registration />} />
                <Route path="login/" element={<LogIn />} />
                <Route path="profile/" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Main;
