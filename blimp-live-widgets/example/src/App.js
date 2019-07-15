import React, { Component } from 'react'

import {ExampleComponent, HelloWorld, IFrameComponent, Clock, ClockThemes, Countdown} from 'blimp-live-widgets'

export default class App extends Component {
  render () {
    return (
      <div>
        <ExampleComponent text='Modern React component module' />
        <HelloWorld />
        <IFrameComponent url="https://www.youtube.com/embed/h_m-BjrxmgI" />
        <Clock width={300} theme={ClockThemes.navy} showSmallTicks={false}/>
        <br/>
        <Countdown />
      </div>
    )
  }
}
