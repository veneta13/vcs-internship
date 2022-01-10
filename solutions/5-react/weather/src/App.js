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
      location: 'Sofia'
    };
  }

  handleChange = event => {
    this.setState({location: event.target.value});
  }

  handleSubmit = event => {
    const request = `${URL}?q=${this.state.location}&units=${UNIT}&appid=${KEY}`

    axios.get(request)
      .then(res => {
        const response = res.data;

        let weather = response.weather[0].main
        weather += " (" + response.weather[0].description +")"

        let temperature = [
          response.main.temp + " C°",
          "LOW " + response.main.temp_min + " C°",
          "HIGH " + response.main.temp_max + " C°"
        ];

        let cloudiness = response.clouds.all + " %";
        let windiness = response.wind.speed + " meter/sec";
        let pressure = response.main.pressure + " hPa";
        let humidity = response.main.humidity + "%";

        this.setState({
          location: this.state.location,
          weather: weather,
          temperature: temperature[0],
          temperatureMin: temperature[1],
          temperatureMax: temperature[2],
          cloudiness: cloudiness,
          windiness: windiness,
          pressure: pressure,
          humidity: humidity,
        });
      })
    event.preventDefault();
}

  render() {
    return (
      <div id="weather-display">
        <form onSubmit={this.handleSubmit}>

          <label>
            Location:
            <input type="text" value={this.state.location} onChange={this.handleChange} />
          </label>

            <p>Weather: {this.state.weather}</p>
            <p>Temperature: {this.state.temperature} {this.state.temperatureMin} {this.state.temperatureMax}</p>
            <p>Cloudiness: {this.state.cloudiness}</p>
            <p>Windiness: {this.state.windiness}</p>
            <p>Pressure: {this.state.pressure}</p>
            <p>Humidity: {this.state.humidity}</p>

          <input type="submit" value="Get weather!" />
          
        </form>
      </div>
    );
  }
}

export default App;
