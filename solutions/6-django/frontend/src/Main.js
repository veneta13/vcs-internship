import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from '../src/pages/Home';
import LogIn from '../src/pages/LogIn';
import Registration from '../src/pages/Registration';

const Main = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login/" element={<LogIn />} />
                <Route path="register/" element={<Registration />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Main;
