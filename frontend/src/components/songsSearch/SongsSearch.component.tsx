import React, {Component, ChangeEvent} from 'react';
import {observer,inject} from 'mobx-react'
import {YoutubeURL,isYoutubePath, Song,SecondaryComponentMode} from '../../types'
import './SongsSearch.css'
import karaokempLogo from '../../pics/logo.png';
import youtubeLogo from '../../pics/youtube-logo.svg';

import ReactPlayer from 'react-player'
import SecondaryComponent from '../secondary.component'
import Error from '../message.component'
import ValidMark from '../validMark.component'
import { Store } from '../../store/store';

const DEFAULT_VIDEO_ID = 'FxyQTb6n4_I'
const KARAOKEMP_BACKEND = process.env.REACT_APP_KARAOKEMP_BACKEND || 'http://localhost:4000'



export default inject("store")(observer(class SongsSearchComponent extends Component<{ store?: Store }, {
   term: string,
   selectedVideoID: string,
   errorMessage:string,
   suggestions:Song[]|null,
   secondaryComponent: SecondaryComponentMode
  }>{

  constructor(props:any) {
    super(props);
    this.state = {
      term :'',
      errorMessage:'',
      selectedVideoID :DEFAULT_VIDEO_ID,
      suggestions: null,
      secondaryComponent : SecondaryComponentMode.BACKEND_STATE      
    }
   
  }
  
  handleInputChange(change:ChangeEvent<HTMLInputElement> ){
    let value = change.target.value
    this.props.store?.toggleTheme()

    if(isYoutubePath(value)){
      let link = new YoutubeURL(value)
      let videoId = link.searchParams.get('v') || this.state.selectedVideoID
      this.setState({selectedVideoID:videoId})

    }else{
      fetch(`${KARAOKEMP_BACKEND}/songs?term=${value}`)
      .then(res => res.json())
      .then((newSuggestions:Song[]) => {
        this.setState({suggestions:newSuggestions})
      }).catch(console.error)

    }
        

  }

  handleRequest(){
    if(this.state.selectedVideoID.length && !this.state.errorMessage){
      this.sendRequest();
    }else{
      this.setState({errorMessage: "Could not send request!"})
    }

  }

  sendRequest(){
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({videoId: this.state.selectedVideoID})
  };
  fetch('http://localhost:4000/link', requestOptions)
      .then(response => response.json())
      .then((newBackendState) => {
      this.setState({secondaryComponent:SecondaryComponentMode.BACKEND_STATE})
    }).catch(console.error)
}

  render() {
    return(<div className="container">
  <div className="row">
    <div className="col-6 col-lg-6">
      <h1>Welcome to The Karaokemp!</h1>
      <div className="text-center"><img className='big' src={karaokempLogo} alt='' style={{height:'100px'}}/></div> <br/><hr/>
        
        <div className='instructions'>Insert Link from &nbsp;<img src={youtubeLogo}alt=''/>
        <input type="text"  onChange={this.handleInputChange.bind(this)} style={{ width: "80%" }} placeholder='title, artist, link'/>
        <ValidMark valid={!this.state.errorMessage && this.state.term.length >0 }/>

       <Error/>
        </div>
        <ReactPlayer url={`https://www.youtube.com/watch?v=${this.state.selectedVideoID}&vl=en`} />
                <button  className="btn btn-primary" onClick={this.handleRequest.bind(this)}>Request song!</button>


        <hr/>

    </div>
    <div className="col-6 col-lg-6">
      <SecondaryComponent mode = {this.state.secondaryComponent} />
      </div>
  </div>
</div>)
  }

}))