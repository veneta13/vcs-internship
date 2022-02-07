import React from 'react';
import axios from 'axios';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
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

        axios.post('http://localhost:8000/api/token-auth/', {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                localStorage.setItem('token', res.data.token);
            });
    }

    render() {
        return (
          <div>
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
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
              </label>
              <button type="submit">Log in</button>
            </form>
          </div>
        );
    }
}

export default LogIn;
