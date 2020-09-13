import React, {Component} from 'react';
import ReactPlayer from 'react-player'


export default class App extends Component{
  constructor(props:string) {
    super(props);
  }
  render () {
    return (
    <div className='player-wrapper'>
        <ReactPlayer
        className='react-player fixed-bottom'
        url= 'https://www.youtube.com/watch?v=AUjmpbd-U2Q'
        width='100%'
        height='100%'
        controls = {true}

        />
    </div>
    )
}
}
