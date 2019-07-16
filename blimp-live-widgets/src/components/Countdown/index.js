import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class Countdown extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      timeStart: 0,
      timeRemaining: 0,
      seconds: 0, minutes: 0, hours: 0,
      countdown: false
    };
  }
  decrementTimeRemaining = () => {
    if (this.state.timeRemaining > 0) {
      this.state.timeRemaining = this.state.timeRemaining - 1;
      this.formatTime();
    }
  };
  formatTime = () => {
    let timeRemaining = this.state.timeRemaining;
    this.setState({
      seconds: timeRemaining % 60,
      minutes: Math.floor(timeRemaining / 60) % 60,
      hours: Math.floor(timeRemaining / 3600) % 24
    });
  };
  changeSeconds = (event) => {
    if (!this.state.countdown && event.target.value < 60) {
      this.setState({
        timeRemaining: this.state.timeRemaining - this.state.seconds + parseInt(event.target.value),
        seconds: event.target.value
      })
    }
  };
  changeMinutes = (event) => {
    if (!this.state.countdown && event.target.value < 60) {
      this.setState({
        timeRemaining: this.state.timeRemaining - this.state.minutes*60 + parseInt(event.target.value)*60,
        minutes: event.target.value
      })
    }
  };
  changeHours = (event) => {
    if (!this.state.countdown && event.target.value < 24) {
      this.setState({
        timeRemaining: this.state.timeRemaining - this.state.hours*3600 + parseInt(event.target.value)*3600,
        hours: event.target.value
      })
    }
  };

  startCountdown = () => {
    if (!this.state.countdown && this.state.timeRemaining > 0) {
      this.timer = setInterval(() => {
        this.decrementTimeRemaining();
      }, 1000);
      this.state.countdown = true;
    }
  };
  stopCountdown = () => {
    clearInterval(this.timer);
    this.state.countdown = false;
  };
  resetCountdown = () => {
    this.stopCountdown();
    this.state.timeRemaining = this.state.timeStart;
    this.formatTime();
  };
  handleFocus = (event) => event.target.select();

  render() {
    const { seconds, minutes, hours } = this.state;
    let displaySec = ("0" + seconds).slice(-2);
    let displayMin = ("0" + minutes).slice(-2);
    let displayHr = ("0" + hours).slice(-2);

    return (
      <div className={styles.countdown}>
        <input className={styles.digit} type="text" value={displayHr} onClick={this.handleFocus} onChange={this.changeHours}></input>
        <span className={styles.colon}>:</span>
        <input className={styles.digit} type="text" value={displayMin} onClick={this.handleFocus} onChange={this.changeMinutes}></input>
        <span className={styles.colon}>:</span>
        <input className={styles.digit} size="1" type="text" value={displaySec} onClick={this.handleFocus} onChange={this.changeSeconds}></input>
        <br></br>

        <button className={styles.button} onClick={this.startCountdown}> Start </button>
        <button className={styles.button} onClick={this.stopCountdown}> Stop </button>
        <button className={styles.button} onClick={this.resetCountdown}> Reset </button>
      </div>
    );
  }
}
