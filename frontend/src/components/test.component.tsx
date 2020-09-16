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
        url= 'https://karaoke-songs.s3.eu-central-1.amazonaws.com/The+Bad+Touch+-+The+Bloodhound+Gang+_+Karaoke+Version+_+KaraFun-AUjmpbd-U2Q.mp4'
        width='100%'
        height='100%'
        controls = {true}

        />
    </div>
    )
}
}
