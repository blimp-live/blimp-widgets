import React, { Component } from 'react'
import {ExampleComponent, HelloWorld, IFrameComponent, Clock, ClockThemes, Countdown, ScrollingText, TwitterComponent, Weather, Gallery} from 'blimp-live-widgets'

export default class App extends Component {
  render () {
    return (
      <div>
        <Gallery/>
        <ExampleComponent
          text='Modern React component module'
          size="40px"
          font="Arial"
          color="Purple"
          background_color="Pink"
          border_color="Green"
          align="center"
          />
        <HelloWorld />
        <IFrameComponent url="https://www.youtube.com/embed/dvgZkm1xWPE" />
        <Clock width={300} theme={ClockThemes.navy} showSmallTicks={false}/>
        <Countdown />
        <ScrollingText text='Here is a test' />
        <TwitterComponent account="HackTheNorth" />
        <Weather city="Toronto" units="metric"/>
      </div>
    )
  }
}
