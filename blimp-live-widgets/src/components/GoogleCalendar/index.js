import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const EventRender = ({events}) => (
  <div>
    {events.map(ev => (
      <div className={styles.event} key={ev.id}>
        <div className={styles.time}>
          <div className={styles.timeText}>
            {new Date(ev.start_time).getHours() % 12 || 12}:
            {new Date(ev.start_time).getMinutes() < 10 ? '0'+new Date(ev.start_time).getMinutes() : new Date(ev.start_time).getMinutes()}
            {new Date(ev.start_time).getHours() >= 12 ? 'pm' : 'am'}
            <div style={{fontStyle: 'italic', fontSize: '12px'}}>to</div>
            {new Date(ev.end_time).getHours() % 12 || 12}:
            {new Date(ev.end_time).getMinutes() < 10 ? '0'+new Date(ev.end_time).getMinutes() : new Date(ev.end_time).getMinutes()}
            {new Date(ev.end_time).getHours() >= 12 ? 'pm' : 'am'}
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>{ev.title}</div>
          <div className={styles.location}>
            <i className="fa fa-map-marker"></i> {ev.location}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default class GoogleCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  getEvents = (schedule) => {
    var count = 5; var schedule_arr = [];
    schedule.forEach(function (ev, index) {
      if (Date.now() <= new Date(ev.start_time) && count > 0) {
        schedule_arr.push(ev);
        count--;
      }
    });
    this.setState({
      events: schedule_arr
    });
  };

  componentDidMount() {
    const schedule = require("./schedule.json");
    this.timer = setInterval(() => {
      this.getEvents(schedule);
    }, 1000);
  }

  render() {
    return (
      <div>
        <EventRender events={this.state.events}/>
      </div>
    );
  }
}
