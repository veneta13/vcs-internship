import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const BACKEND_URL = 'http://localhost:8000/api/auth/'

const LogIn = () =>{
    let navigate = useNavigate();
    let [state, setState] = useState({
        username: '',
        password: '',
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
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                navigate('/');
            } else {
                alert('Unable to log in.');
            }
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
                        />
                    </label>
                    <br/>
                    <button type='submit'>Log In</button>
                </form>
            </div>
        </div>
    );
}

export default LogIn;
