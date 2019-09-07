import React, { Component } from 'react'
import PropTypes from 'prop-types'
import analogStyles from './styles'
import digitalStyles from './styles.css'
import ClockLayout from './ClockLayout';
import { cssTransform, updateTime } from './utils';
import * as Themes from './themes';

export const ClockThemes = Themes;
export default class Clock extends Component {

  constructor(props) {
    super();
    const date = this.initializeTime(props.gmtOffset);
    this.state = {
      seconds: date[2],
      minutes: date[1],
      hour: date[0],
    };
    this.styles = cssTransform(analogStyles, props);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(updateTime(this.state));
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    this.styles = cssTransform(analogStyles, nextProps);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  initializeTime(gmtOffset) {
    const now = new Date();
    if (gmtOffset && gmtOffset !== 'undefined') {
      const offsetNow = new Date(now.valueOf() + (parseFloat(gmtOffset) * 1000 * 60 * 60));
      return [offsetNow.getUTCHours(), offsetNow.getUTCMinutes(), offsetNow.getUTCSeconds()];
    } else {
      return [now.getHours(), now.getMinutes(), now.getSeconds()]
    }
  }

  render() {

    return (
      <div className = {digitalStyles.wrapper}>
        {/*<ClockLayout {...this.state} styles={this.styles} showSmallTicks={this.props.showSmallTicks} />*/}
        <p className = {digitalStyles.clock}>{this.state.hour == 12 || this.state.hour == 0 ? 12 : this.state.hour%12}:{('0' + this.state.minutes).slice(-2)}:{('0' + this.state.seconds).slice(-2)} { this.state.hour/12 > 0 ? "PM": "AM" }</p>
      </div>
    )
  }
}

Clock.propTypes = {
  theme: PropTypes.shape({
          background: PropTypes.string.isRequired,
          border: PropTypes.string.isRequired,
          center: PropTypes.string.isRequired,
          seconds: PropTypes.string.isRequired,
          minutes: PropTypes.string.isRequired,
          hour: PropTypes.string.isRequired,
          tick: PropTypes.string.isRequired,
  }),
  width: PropTypes.number,
  gmtOffset: PropTypes.string,
  showSmallTicks: PropTypes.bool,
};

Clock.defaultProps = {
  theme: Themes.dark,
  width: 400,
  showSmallTicks: true,
};
