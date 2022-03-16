import React from 'react';
import {  Link } from "react-router-dom";

const Navbar = () =>{
    console.log(localStorage.getItem('token'))
    console.log(localStorage.getItem('token') !== null)
    console.log(localStorage.getItem('token') != '')
    if (localStorage.getItem('token') !== null) {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            </nav>
        );
    }
    else {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;
