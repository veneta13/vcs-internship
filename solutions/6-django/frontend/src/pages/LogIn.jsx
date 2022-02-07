import React from 'react';
import apiClient from '../axiosClient'

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
            username: this.state.username,
            password: event.target.value,
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        apiClient.post('/token-auth/')
            .then(res => {
                const response = res.data;
            })

        // const token = '';
        // sessionStorage.setItem("key", "value");
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
