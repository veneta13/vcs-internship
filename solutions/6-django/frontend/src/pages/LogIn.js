import React from 'react';

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
        username: event.target.value,
        password: this.state.password
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
  const token = '';
  localStorage.setItem('token', token);
  console.log(this.state);
}

render() {
  return (
    <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Email or username
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
