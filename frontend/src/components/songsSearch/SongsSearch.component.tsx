import React, {Component} from 'react';
import './SongsSearch.css'
import karaokempLogo from '../../pics/logo.png';
import youtubeLogo from '../../pics/youtube-logo.svg';

import backendState from '../../static/state.json'


export default class SongsSearchComponent extends Component{
  constructor(props:string) {
    super(props);
    this.state = {
      selectedVideo: null
    }


  }
  render() {
    return(

      <div className="container">
  <div className="row">
    <div className="col-6 col-lg-6">
      <p className="p-style"><h1>Welcome to The Karaokemp!</h1></p>
      <img className='big' src={karaokempLogo}/>
        <p className='instructions'>insert Link from &nbsp;
        <img src={youtubeLogo}/></p>
        <p><input type="text" /></p>
    </div>
    <div className="col-6 col-lg-6">
      <h4>requests</h4>
      <hr/>
      <ol>
    {backendState.requests.map(url=><li>{url}</li>)}
        </ol>

    </div>
  </div>
</div>)
      
  }
}

