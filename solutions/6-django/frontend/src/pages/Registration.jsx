import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const BACKEND_URL_REG = 'http://localhost:8000/api/users/registration/'
const BACKEND_URL_LOG = 'http://localhost:8000/api/auth/'

const Registration = () => {
    let navigate = useNavigate();
    
    let [state, setState] = useState({
        username: '',
        password: '',
        status: '',
    });

    const handleUsernameChange = event => {
        event.preventDefault();
        setState({
            ...state,
            username: event.target.value
        });
    }

    const handlePasswordChange = event => {
        event.preventDefault();
        setState({
            ...state,
            password: event.target.value,
        });
    }

    const handleSubmit = event => {
        event.preventDefault();

        axios.post(BACKEND_URL_REG, {
            username: state.username,
            password: state.password
        })
            .then(res => {
                axios.post(BACKEND_URL_LOG, {
                    username: state.username,
                    password: state.password
                })
                    .then(res => {
                        localStorage.setItem('token', res.data.token);
                        navigate('/profile');
                    })
                    .catch(error => {
                        setState({
                            ...state,
                            status: 'Error: Cound not log in as the new user!',
                        });
                    });
            })
            .catch(error => {
                setState({
                    ...state,
                    status: 'Error: Cound not create a new user!',
                }); 
            });
    }

    return (
        <div>
            <h1> Registration </h1>
            <div className='input-box'>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username
                        <input
                            name='username'
                            type='text'
                            value={state.username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </label>
                    <br/>
                    <label>
                        Password
                        <input
                            name='password'
                            type='password'
                            value={state.password}
                            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                            title='Must contain at least 8 characters - one number, one uppercase and one lowercase letter'
                            onChange={handlePasswordChange}
                            required
                        />
                    </label>

                    <button type='submit'>Register</button>
                    <p>{state.status}</p>
                </form>
            </div>
        </div>
    );
}

export default Registration;
