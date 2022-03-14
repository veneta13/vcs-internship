import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LogIn = () =>{
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
        axios.post('http://localhost:8000/api/auth/', {
            username: state.username,
            password: state.password
        })
        .then(res => {
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                navigate("/");
            } else {
                alert('Unable to log in.');
            }
        });
    }

    return (
        <div>
            <h1> Log In </h1>
            <div class="input-box">
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
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
}

export default LogIn;
