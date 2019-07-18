import React, { Component } from 'react'

import {ExampleComponent, HelloWorld, IFrameComponent, Clock, ClockThemes, Countdown, ScrollingText, Weather} from 'blimp-live-widgets'

export default class App extends Component {
  render () {
    return (
      <div>
        <ExampleComponent text='Modern React component module' />
        <HelloWorld />
        <IFrameComponent url="https://www.youtube.com/embed/h_m-BjrxmgI" />
        <Clock width={300} theme={ClockThemes.navy} showSmallTicks={false}/>
        <Countdown />
        <ScrollingText text='Here is a test' />
        <Weather />
      </div>
    )
  }
}
