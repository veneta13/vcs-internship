import React from 'react';
import axios from 'axios';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: ''
        };
    }

    handleUsernameChange = event => {
        event.preventDefault();
        this.setState({
            username: event.target.value
        });
    }

    handlePasswordChange = event => {
        event.preventDefault();
        this.setState({
            password: event.target.value,
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        axios.post('http://localhost:8000/api/token-auth/', {
            username: this.state.username,
            password: this.state.password
        })
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
            } else {
                alert('Unable to log in.');
            }
        });
    }

    render() {
        return (
            <div>
                <h1> Log In </h1>
                <div class="input-box">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Username
                            <input
                                name="username"
                                type="text"
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                            />
                        </label>
                        <br/>
                        <label>
                            Password
                            <input
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                        </label>
                        <br/>
                        <button type="submit">Log In</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LogIn;
