import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {
        city: "Waterloo",
        temperature: 0,
        main: "None",
        description: "None",
      },
      isLoaded: false
    };
  }

   componentDidMount() {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=Waterloo,CA&appid=d79a0d378573a8b844d4a8b7e1c963d6")
      .then(function(res){
        return res.json();
      })
      .then(
        (result) => {
          console.log("TEST")

          console.log(result)
          this.setState({
            weather: {
              city: result.name,
              temperature: Math.round(result.main.temp - 273),
              main: result.weather[0].main,
              description: result.weather[0].description
            },
            isLoaded: true
          });

          console.log(this.state)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const error = this.state.error;
    const isLoaded = this.state.isLoaded;
    const weather = this.state.weather;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h3 className = {styles.city}> {weather.city} </h3>
          <p className = {styles.temperature}> {weather.temperature} </p>
          <p className = {styles.main}> {weather.main} </p>
          <p className = {styles.description}> {weather.description} </p>
        </div>
      )
    }
  }
}
