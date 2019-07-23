import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class ExampleComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {test: "whoreslut"}
    this.setOptions = this.setOptions.bind(this)
  }

  static propTypes = {
    text: PropTypes.string,
    size: PropTypes.string,
    font: PropTypes.string,
    color: PropTypes.string,
    background_color: PropTypes.string,
    border_color: PropTypes.string,
    align: PropTypes.string,
  }

  setOptions() {
    console.log('Set Options');
    return "options"
  }

  render() {
    const {
      text,
      size,
      font,
      color,
      background_color,
      border_color,
      align,
    } = this.props

    return (
      <div className={styles.test}
           style={{
             "font-size" : size,
             "font-family": font,
             "color": color,
             "background-color": background_color,
             "border-color": border_color,
             "text-align": align}}>
        Example Component: {text}
      </div>
    )
  }
}
