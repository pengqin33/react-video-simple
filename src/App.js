import React, { Component } from 'react';
// import ReactVideoSimple from 'react-video-simple'
import ReactVideoSimple from './Video'

class App extends Component {

  render () {
    return <ReactVideoSimple src='https://media.w3.org/2010/05/sintel/trailer.mp4'
                             poster='https://media.w3.org/2010/05/sintel/poster.png'
                             size='10.96M'
                             fullscreenBtn
                             loop
                             pauseBtn/>
  }
}

export default App
