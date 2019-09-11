import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const EventRender = ({events}) => (
  <div>
    {events.map(ev => (
      <div className={styles.event} key={ev[0].id}>
        <div className={styles.time} style={{backgroundColor: ev[1]}}>
          <div className={styles.timeText}>
            {new Date(ev[0].start_time).getHours() % 12 || 12}:
            {new Date(ev[0].start_time).getMinutes() < 10 ? '0'+new Date(ev[0].start_time).getMinutes() : new Date(ev[0].start_time).getMinutes()}
            {new Date(ev[0].start_time).getHours() >= 12 ? 'pm' : 'am'}
            <div style={{fontStyle: 'italic', fontSize: '12px'}}>to</div>
            {new Date(ev[0].end_time).getHours() % 12 || 12}:
            {new Date(ev[0].end_time).getMinutes() < 10 ? '0'+new Date(ev[0].end_time).getMinutes() : new Date(ev[0].end_time).getMinutes()}
            {new Date(ev[0].end_time).getHours() >= 12 ? 'pm' : 'am'}
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>{ev[0].title}</div>
          <div className={styles.location}>
            <i className="fa fa-map-marker"></i> {ev[0].location}
          </div>
          <div className={styles.tag} style={{color: ev[1]}}>
            {ev[0].tags[0]}
          </div>
        </div>
      </div>
    ))}
  </div>
);

// <div className={styles.location}>
//   {ev.tags[0]}
// </div>

export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  getEvents = (schedule) => {
    var count = 35; var schedule_arr = [];
    schedule.forEach(function (ev, index) {
      if (Date.now() <= new Date(ev.start_time) && count > 0) {
        var color = '#183249'; //activities
        if (ev.tags[0] == 'logistics') {
          color = '#FFC684';
        } else if (ev.tags[0] == 'food') {
          color = '#61ADD8';
        } else if (ev.tags[0] == 'workshop') {
          color = '#D25466';
        } else if (ev.tags[0] == 'talk') {
          color = '#85EFC3';
        } else if (ev.tags[0] == 'lightning challenge') {
          color = '#EABB9D';
        }
        schedule_arr.push([ev, color]);
        count--;
      }
    });
    this.setState({
      events: schedule_arr
    });
  };

  componentDidMount() {
    const schedule = require('./schedule.json');
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
