import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import logo from './assets/htn.png'

export default class Logo extends Component {
  static propTypes = {
    image: PropTypes.string,
    backgroundColor: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.logo = this.props.image || logo;
    this.backgroundColor = this.props.backgroundColor || "#183249";
  }

  render() {

    return (
      <div style={{backgroundColor: this.backgroundColor}} >
        <img src={logo} />
      </div>
    )
  }
}
