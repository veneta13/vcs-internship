import React from 'react';
import axios from 'axios';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          status: 'Enter username and password',
          username: '',
          password: '',
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

        axios.post('http://localhost:8000/api/users/registration/', {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                if (res.hasOwnProperty('username') && res.username === this.state.username) {
                    this.setState({
                        status: 'Successfully created a new user'
                    });
                } else {
                    this.setState({
                        status: 'Error: Could not create a new user'
                    });
                }
            });
    }

    render() {
        return (
            <div>
                <h1> Registration </h1>
                <div class="input-box">
                    <p>{this.state.status}</p>
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
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Registration;
