import React, { Component } from 'react'

import {ExampleComponent, HelloWorld} from 'blimp-live-widgets'

export default class App extends Component {
  render () {
    return (
      <div>
        <ExampleComponent text='Modern React component module' />
        <HelloWorld />
      </div>
    )
  }
}
