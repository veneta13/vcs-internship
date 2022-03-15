import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Registration = () => {
    let navigate = useNavigate();
    
    let [state, setState] = useState({
        status: 'Enter username and password',
        username: '',
        password: '',
    });

    const handleUsernameChange = event => {
        event.preventDefault();
        setState({
            status: state.status,
            username: event.target.value,
            password: state.password
        });
    }

    const handlePasswordChange = event => {
        event.preventDefault();
        setState({
            status: state.status,
            username: state.username,
            password: event.target.value,
        });
    }

    const handleSubmit = event => {
        event.preventDefault();

        console.log(state)

        axios.post('http://localhost:8000/api/users/registration/', {
            username: state.username,
            password: state.password
        })
            .then(res => {
                if (res.hasOwnProperty('username') && res.username === state.username) {
                    setState({
                        status: 'Successfully created a new user'
                    });
                    navigate("/login");
                } else {
                    setState({
                        status: 'Error: Could not create a new user'
                    });
                }
            });
    }

    return (
        <div>
            <h1> Registration </h1>
            <div className="input-box">
                <p>{state.status}</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username
                        <input
                            name="username"
                            type="text"
                            value={state.username}
                            onChange={handleUsernameChange}
                        />
                    </label>
                    <br/>
                    <label>
                        Password
                        <input
                            name="password"
                            type="password"
                            value={state.password}
                            onChange={handlePasswordChange}
                        />
                    </label>
                    <br/>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Registration;
