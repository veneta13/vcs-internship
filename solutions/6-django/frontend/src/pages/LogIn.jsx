import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const BACKEND_URL = 'http://localhost:8000/api/auth/'

const LogIn = () =>{
    let navigate = useNavigate();
    let [state, setState] = useState({
        username: '',
        password: '',
        status: ''
    });

    const handleUsernameChange = event => {
        event.preventDefault();
        setState({
            ...state,
            username: event.target.value,
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
        axios.post(BACKEND_URL, {
            username: state.username,
            password: state.password
        })
        .then(res => {
            localStorage.setItem('token', res.data.token);
            navigate('/');
        })
        .catch(error => {
            setState({
                ...state,
                status: 'Error: Unable to log in with provided credentials!',
            });
        });
    }

    return (
        <div>
            <h1> Log In </h1>
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
                            onChange={handlePasswordChange}
                            required
                        />
                    </label>
                    <br/>
                    <button type='submit'>Log In</button>
                    <p>{state.status}</p>
                </form>
            </div>
        </div>
    );
}

export default LogIn;
