import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

import { jsonObject } from './schedule.js'

const category_to_color_mappings = {
  'logistics': 'rgb(24, 50, 73)',
  'talk': 'rgb(24, 50, 73)',
  'judging': 'rgb(24, 50, 73)',
  'food': 'rgb(237, 150, 21)',
  'workshop': 'rgb(67, 175, 222)',
  'lightning_challenge': 'rgb(227, 72, 100)',
  'activities': 'rgb(227, 72, 100)'
}

const category_to_display_category_mappings = {
  'logistics': 'Event',
  'talk': 'Event',
  'judging': 'Event',
  'food': 'Food',
  'workshop': 'Workshop',
  'lightning_challenge': 'Activity',
  'activities': 'Activity'
}

const EventRender = ({events}) => (
  <div style={{width: '100%'}}>
    {events.map(ev => (
      <div className={styles.event} key={ev[0].id}>
        <div className={styles.borderLeft} style={{backgroundColor: ev[1]}} />
        <div className={styles.info}>
          <div className={styles.title}>{ev[0].title}</div>
          <div className={styles.location}>
            <i className="fa fa-map-marker"></i> {ev[0].location}
          </div>
        </div>
        <div className={styles.timeText}>
          {new Date(ev[0].start_time).getHours() % 12 || 12}:
          {new Date(ev[0].start_time).getMinutes() < 10 ? '0'+new Date(ev[0].start_time).getMinutes() : new Date(ev[0].start_time).getMinutes()}
          {new Date(ev[0].start_time).getHours() >= 12 ? 'pm' : 'am'}
          {' - '}
          {new Date(ev[0].end_time).getHours() % 12 || 12}:
          {new Date(ev[0].end_time).getMinutes() < 10 ? '0'+new Date(ev[0].end_time).getMinutes() : new Date(ev[0].end_time).getMinutes()}
          {new Date(ev[0].end_time).getHours() >= 12 ? 'pm' : 'am'}
          <div className={styles.tag} style={{color: ev[1]}}>
            {category_to_display_category_mappings[ev[0].tags[0]]}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  getEvents = (schedule) => {
    var count = 20; var schedule_arr = [];
    schedule.forEach(function (ev, index) {
      if (Date.now() <= new Date(ev.start_time) && count > 0) {
        var color = category_to_color_mappings[ev.tags[0]];
        schedule_arr.push([ev, color]);
        count--;
      }
    });
    this.setState({
      events: schedule_arr
    });
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.getEvents(jsonObject());
    }, 1000);
  }

  render() {
    return (
      <EventRender events={this.state.events}/>
    );
  }
}
