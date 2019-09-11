import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import { updateDate } from './utils';

export default class DateComponent extends Component {

  
  constructor(props) {
    var currentDate = new Date()
    super(props);
    
    const date = this.initializeDate(props.gmtOffset);
    this.state = {
      weekday: date[0],
      month: date[1],
      day: date[2],
      year: date[3],
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(updateDate(this.state));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  initializeDate(gmtOffset) {
    const now = new Date();
    if (gmtOffset && gmtOffset !== 'undefined') {
      const offsetNow = new Date(now.valueOf() + (parseFloat(gmtOffset) * 1000 * 60 * 60));
      return [offsetNow.getUTCDay(), offsetNow.getUTCMonth(), offsetNow.getUTCDate(), offsetNow.getUTCFullYear()];
    } else {
      return [now.getDay(), now.getMonth(), now.getDate(), now.getFullYear()]
    }
  }

  render() {
    const dayOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const monthOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  
    const {
      weekday,
      month,
      day,
      year,
    } = this.props

    return (
      <div className={styles.wrapper}>
        <p className={styles.date}>{dayOfTheWeek[this.state.weekday]}, {monthOfTheYear[this.state.month]} {this.state.day}, {this.state.year} </p>
      </div>
    )
  }

}
