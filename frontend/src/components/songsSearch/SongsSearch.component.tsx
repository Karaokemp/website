import React, {Component, ChangeEvent} from 'react';
import './SongsSearch.css'
import karaokempLogo from '../../pics/logo.png';
import youtubeLogo from '../../pics/youtube-logo.svg';

import YouTube from 'react-youtube';
import BackendState from '../backendState.component'


let youtubeOpts:any
youtubeOpts={
  height: '300',
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
    //event.target.pauseVideo();
  }

  render() {
    return(<div className="container">
  <div className="row">
    <div className="col-6 col-lg-6">
      <h1>Welcome to The Karaokemp!</h1>
      <div className="text-center"><img className='big' src={karaokempLogo} alt='' style={{height:'100px'}}/></div> <br/><hr/>
        
        <p className='instructions'>Insert Link from &nbsp;<img src={youtubeLogo}alt=''/>
        <input type="text"  onChange={this.handleLinkPathChange.bind(this)} style={{ width: "80%" }} placeholder='https://www.youtube.com/watch?v=...'/></p>
        <YouTube videoId={this.state.selectedVideoID} opts = {youtubeOpts}/>
                <button  className="btn btn-primary">Request song!</button>


        <hr/>

    </div>
    <div className="col-6 col-lg-6">
      <BackendState/>
      </div>
  </div>
</div>)
      
  }


}


