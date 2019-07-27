import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export default class GoogleCalendar extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      events: []
    };
  }

  signIn = () => {
    self = this;
    gapi.auth2.getAuthInstance().signIn().then(function() {
      self.events();
    });
  };
  signOut = () => {
    this.setState({ events: [] })
    gapi.auth2.getAuthInstance().signOut();
    gapi.auth2.getAuthInstance().disconnect(); //cannot automatically sign in
  };
  calendar = () => {
    var request = gapi.client.calendar.calendarList.list({
    }).then(function(response) {
      console.log(response.result.items);
    });
  };

  selectEvent = (event) => {
    console.log(event);
  };

  events = () => {
    var self = this;
    var request = gapi.client.calendar.events.list({
      'calendarId': "primary",
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function(response) {
      var events = response.result.items;
      var event_list = []

      for (var i=0; i < events.length; i++) {
        event_list.push({
          id: events[i].id,
          title: events[i].summary,
          start: moment(events[i].start.dateTime, 'YYYY-MM-DD').toDate(),
          end: moment(events[i].end.dateTime, 'YYYY-MM-DD').toDate()
        });
      }
      self.setState({
        events: event_list
      });
    });
  };

  componentDidMount() {
    var self = this;
    gapi.load('client:auth2', function() {
      gapi.client.init({
        apiKey: 'AIzaSyAgcRDOmfb0eEv2gWKEFW-_hR2UxwHTkfI',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        clientId: '144483595361-bvkg292260d7rkbabkdjg0eil7403k0s',
        scope: "https://www.googleapis.com/auth/calendar.readonly"
      }).then(function() {
          self.events();
      });
    });
  }

  render() {
    console.log(this.state.events);
    return (
      <div className="GoogleCalendar">
        <Calendar
            localizer={localizer}
            events={this.state.events}
            style={{ height: "50vh" }}
            onSelectEvent={this.selectEvent}
        />
        <div className="g-signin2" onClick={this.signIn}></div>
        <button onClick={this.signOut}>Sign out</button>
        <button onClick={this.calendar}>Calendar</button>
      </div>
    );
  }
}
