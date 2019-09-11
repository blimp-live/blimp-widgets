import React, { Component } from 'react'
import {ExampleComponent, HelloWorld, IFrameComponent, Clock, ClockThemes, Countdown, ScrollingText, TwitterComponent, Weather, Gallery, DateComponent, Logo} from 'blimp-live-widgets'

export default class App extends Component {

  render () {
    const galleryContainerStyle = {
      height: '100%',
      width: '100%',
    };
    return (
      <div>
        <div id="container" style={galleryContainerStyle}>
          <Logo/>
        </div>
        <div id="container" style={galleryContainerStyle}>
          <Gallery interval={3000} backgroundColour={'transparent'} includeArrows={true} images={['http://velocity.uwaterloo.ca/wp-content/uploads/2014/08/hackthenorthlogo-e1409325866917.png', 'http://velocity.uwaterloo.ca/wp-content/uploads/2016/08/assets_blue.png', 'https://uwaterloo.ca/engineering/sites/ca.engineering/files/uploads/images/hack_the_north.jpg']}/>
        </div>
        <div id="container2" style={galleryContainerStyle}>
          <Gallery interval={3000} backgroundColour={'transparent'} includeArrows={true}/>
        </div>
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
        <DateComponent />
      </div>
    )
  }
}
