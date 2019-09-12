import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import sunny from './assets/sunny.png'
import cloud from './assets/cloud.png'
import rain from './assets/rain.png'
import snow from './assets/snow.png'
import thunder from './assets/thunder.png'

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {
        city: "Waterloo,CA",
        temperature: 0,
        main: "None",
        description: "None",
        units: "metric",
      },
      isLoaded: false,
    };
  }

   componentDidMount() {
    // TODO: Eventually we don't want to have this appid hardcoded; deal with it later
    if(this.props.city) {
      this.state.weather.city = this.props.city
    }
    if(this.props.units) {
      this.state.weather.units = this.props.units
    }
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+this.state.weather.city+"&units="+this.state.weather.units+"&appid=d79a0d378573a8b844d4a8b7e1c963d6")
      .then(function(res){
        return res.json();
      })
      .then(
        (result) => {
          //Need to do error checking here in case something is unavailable. Need some sort of standard though
          this.setState({
            weather: {
              city: result.name,
              temperature: result.main.temp ,
              main: result.weather[0].main,
              description: result.weather[0].description,
              units: this.state.weather.units,
            },
            isLoaded: true,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const {error, isLoaded, weather} = this.state;
    var img_src = sunny
    var temp_unit = "°C"
    if (weather.units == "metric") {
      temp_unit = "°C"
    } else {
      temp_unit = "°F"
    }
    if (weather.main == "Clouds") {
      img_src = cloud
    } else if (weather.main == "Clear") {
      img_src = sunny
    }
    else if (weather.main == "Rain") {
      img_src = rain
    }
    else if (weather.main == "Snow") {
      img_src = snow
    }
    else if (weather.main == "Thunderstorm") {
      img_src = thunder
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className = {styles.wrapper}>
          <h3 className = {styles.city}> {weather.city} </h3>
          <p className = {styles.temperature}> {weather.temperature}{temp_unit}</p>
          <div className = {styles.main}>
            <img src={ img_src } />
          </div>
        </div>
      )
    }
  }
}
