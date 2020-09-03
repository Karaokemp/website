import React, {Component, ChangeEvent} from 'react';
import './SongsSearch.css'
import karaokempLogo from '../../pics/logo.png';
import youtubeLogo from '../../pics/youtube-logo.svg';

import YouTube, { YouTubeProps } from 'react-youtube';


import backendState from '../../static/state.json'

let youtubeOpts:any
youtubeOpts={
  height: '200',
          width: '80%'
}



export default class SongsSearchComponent extends Component<{}, { linkPath: string, selectedVideoID: string }>{

  constructor(props:string) {
    super(props);
    this.state = {
      linkPath :'',
      selectedVideoID :'qr-Bq_zKddg'
      
    }
    
  }

  handleLinkPathChange(change:ChangeEvent<HTMLInputElement> ){
    const link = new URL(change.target.value)
    let id = link.searchParams.get('v') || this.state.selectedVideoID
    this.setState({linkPath: link.href,selectedVideoID:id})
  }

  _onReady(event:any) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  render() {
    return(

      <div className="container">
  <div className="row">
    <div className="col-6 col-lg-6">
      <p className="p-style"><h1>Welcome to The Karaokemp!</h1></p>
      <div className="text-center"><img className='big' src={karaokempLogo} alt='' style={{height:'100px'}}/></div> <br/><hr/>
        
        <p className='instructions'>Insert Link from &nbsp;<img src={youtubeLogo} alt=''/></p>
        <p><input type="text"  onChange={this.handleLinkPathChange.bind(this)} style={{ width: "80%" }}/>
        <button  className="btn btn-primary">Request!</button>
        <YouTube videoId={this.state.selectedVideoID} opts = {youtubeOpts}/>

        </p>
        <hr/>

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


