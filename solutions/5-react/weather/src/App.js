import './App.css';
import React from 'react';
import axios from 'axios';

const KEY = 'bdc3b5555071a1e48ed8f445e274b3d9'
const URL = 'http://api.openweathermap.org/data/2.5/weather'
const UNIT = 'metric'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Sofia'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const request = `${URL}?q=${this.state.value}&units=${UNIT}&appid=${KEY}`

    axios.get(request)
      .then(res => {
        const response = res.data;
        this.setState({
          value: this.state.value,
          weather: response.weather[0].main,
          description: response.weather[0].description,
          temperature: response.main.temp,
          temperatureMin: response.main.temp_min,
          temperatureMax: response.main.temp_max,
          cloudiness: response.clouds.all,
          windiness: response.wind.speed,
          pressure: response.main.pressure,
          humidity: response.wind.humidity,
        });
      })
    console.log(this.state)
    event.preventDefault();
}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Location:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <p> {this.state.weather} </p>
        <p> {this.state.description} </p>
        <p> {this.state.temperature} </p>
        <p> {this.state.temperatureMin} </p>
        <p> {this.state.temperatureMax} </p>
        <p> {this.state.cloudiness} </p>
        <p> {this.state.windiness} </p>
        <p> {this.state.pressure} </p>
        <p> {this.state.humidity} </p>
        <input type="submit" value="Get weather!" />
      </form>
    );
  }
}

export default App;
