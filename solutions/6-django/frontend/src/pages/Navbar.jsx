import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () =>{
    let navigate = useNavigate();

    const logOut = event => {
        localStorage.clear();
        navigate('/');
    }

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
                    <li>
                        <button type="submit" onClick={() => logOut()}>Logout</button>
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
