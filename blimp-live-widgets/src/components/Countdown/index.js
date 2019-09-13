import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class Countdown extends Component {
  constructor(props) {
    var currentTime = new Date()
    var htnStartTime = new Date(2019, 8, 13, 23, 30, 0, 0) // real HTN start time

    var totalMilliSeconds = htnStartTime - currentTime
    var totalSeconds = Math.floor(totalMilliSeconds / 1000)
    var timeRemaining = totalSeconds

    var hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    var minutes = Math.floor(totalSeconds / 60)
    var seconds = totalSeconds % 60

    super(props)
    this.state = {
      timeStart: 0,
      timeRemaining: timeRemaining,
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      countdown: false,
      htnTitle: 'until hacking starts',
      htnShortTitle: 'Hacking starts:',
      htnHackingStarted: false,
      width: 0
    }
    this.startCountdown()
  }
  decrementTimeRemaining = () => {
    if (this.state.timeRemaining > 0) {
      this.state.timeRemaining = this.state.timeRemaining - 1
      this.formatTime()
    } else if (!this.state.htnHackingStarted) {
      var htnStartTime = new Date(2019, 8, 13, 23, 30, 0, 0) // real HTN start time
      var htnEndTime = new Date(2019, 8, 15, 8, 0, 0, 0) // real HTN end time

      var totalMilliSeconds = htnEndTime - htnStartTime
      var totalSeconds = Math.floor(totalMilliSeconds / 1000)
      var timeRemaining = totalSeconds

      var hours = Math.floor(totalSeconds / 3600)
      totalSeconds %= 3600
      var minutes = Math.floor(totalSeconds / 60)
      var seconds = totalSeconds % 60

      this.setState({
        timeRemaining: timeRemaining,
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        htnTitle: 'until hacking ends',
        // htnShortTitle: 'Hacking ends:',
        htnHackingStarted: true
      })
    } else {
      this.stopCountdown()
    }
  };
  formatTime = () => {
    let timeRemaining = this.state.timeRemaining

    this.setState({
      seconds: timeRemaining % 60,
      minutes: Math.floor(timeRemaining / 60) % 60,
      hours: Math.floor(timeRemaining / 3600)
    })
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
        timeRemaining: this.state.timeRemaining - this.state.minutes * 60 + parseInt(event.target.value) * 60,
        minutes: event.target.value
      })
    }
  };
  changeHours = (event) => {
    if (!this.state.countdown && event.target.value < 24) {
      this.setState({
        timeRemaining: this.state.timeRemaining - this.state.hours * 3600 + parseInt(event.target.value) * 3600,
        hours: event.target.value
      })
    }
  };

  startCountdown = () => {
    if (!this.state.countdown && this.state.timeRemaining > 0) {
      this.timer = setInterval(() => {
        this.decrementTimeRemaining()
        this.checkWidth()
      }, 1000)
      this.state.countdown = true
    }
  };
  stopCountdown = () => {
    clearInterval(this.timer)
    this.state.countdown = false
  };
  resetCountdown = () => {
    this.stopCountdown()
    this.state.timeRemaining = this.state.timeStart
    this.formatTime()
  };
  handleFocus = (event) => event.target.select();

  checkWidth = () => {
    this.state.width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  }

  render() {
    const { seconds, minutes, hours } = this.state
    let displaySec = ('0' + seconds).slice(-2)
    let displayMin = ('0' + minutes).slice(-2)
    let displayHr = hours.toString()
    if (displayHr.length < 2) {
      displayHr = ('0' + hours)
    }

    var title =
      <div className={styles.countdownHeader}>
        {this.state.htnTitle}
      </div>;

    var digitsStyling = styles.largeDigits;
    var colonStyling = styles.largeDigits;
    title =
      <div className={styles.countdownHeader}>
        {this.state.htnTitle}
      </div>;
    digitsStyling = styles.mediumDigits;
    colonStyling = styles.mediumDigits;
    // if (this.state.width <= 830) {
    //   title =
    //     <div className={styles.countdownHeader}>
    //       {this.state.htnShortTitle}
    //     </div>;
    //     digitsStyling = styles.mediumDigits;
    //     colonStyling = styles.mediumDigits;
    // }
    // if (this.state.width <= 450) {
    //   title =
    //     <div className={styles.countdownSmallHeader}>
    //       {this.state.htnShortTitle}
    //     </div>;
    //     digitsStyling = styles.smallDigits;
    //     colonStyling = styles.smallDigits;
    // }


    return (
      <div className={styles.countdown}>
        <div>
          <input className={`${styles.digit} ${digitsStyling}`} type='text' value={displayHr} onClick={this.handleFocus} onChange={this.changeHours} />
          <span className={`${styles.colon} ${colonStyling}`}>:</span>
          <input className={`${styles.digit} ${digitsStyling}`} type='text' value={displayMin} onClick={this.handleFocus} onChange={this.changeMinutes} />
          <span className={`${styles.colon} ${colonStyling}`}>:</span>
          <input className={`${styles.digit} ${digitsStyling}`} size='1' type='text' value={displaySec} onClick={this.handleFocus} onChange={this.changeSeconds} />
          <br />
        </div>
        { title }
        {/* <button className={styles.button} onClick={this.startCountdown}> Start </button>
        <button className={styles.button} onClick={this.stopCountdown}> Stop </button>
        <button className={styles.button} onClick={this.resetCountdown}> Reset </button> */}
      </div>
    )
  }
}
