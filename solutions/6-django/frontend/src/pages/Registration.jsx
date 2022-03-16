import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Registration = () => {
    let navigate = useNavigate();
    
    let [state, setState] = useState({
        username: '',
        password: '',
    });

    const handleUsernameChange = event => {
        event.preventDefault();
        setState({
            username: event.target.value,
            password: state.password
        });
    }

    const handlePasswordChange = event => {
        event.preventDefault();
        setState({
            username: state.username,
            password: event.target.value,
        });
    }

    const handleSubmit = event => {
        event.preventDefault();

        axios.post('http://localhost:8000/api/users/registration/', {
            username: state.username,
            password: state.password
        })
            .then(res => {
                if (res.status === 201) {
                    alert('Successfully created new user')
                    navigate("/login");
                } else {
                    alert('Error: Cound not create a new user!')
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
