import React, {Component} from 'react';
import './SongsSearch.css'
import karaokempLogo from '../../pics/logo.png';
import youtubeLogo from '../../pics/youtube-logo.svg';


export default class SongsSearchComponent extends Component{
  constructor(props:string) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    }

  }
  render() {
    return(
      <div>
        <h1>Welcome to The Karaokemp!</h1>
        <img className='big' src={karaokempLogo}/>
        <p className='instructions'>insert Link from &nbsp;
        <img src={youtubeLogo}/></p>
        <p><input type="text" /></p>

      </div>
    )
  }
}

