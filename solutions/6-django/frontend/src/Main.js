import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from '../src/pages/Home';
import LogIn from '../src/pages/LogIn';
import Registration from '../src/pages/Registration';

import formStyle from './formStyle.css'

const Main = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="register/" element={<Registration />} />
                <Route path="login/" element={<LogIn />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Main;
