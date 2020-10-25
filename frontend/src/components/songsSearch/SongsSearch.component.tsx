import React, {Component, ChangeEvent} from 'react';
import {observer} from 'mobx-react'
import {YoutubeURL,isYoutubePath, Song,SecondaryComponentMode, MessageTheme} from '../../types'
import './SongsSearch.css'
import karaokempLogo from '../../pics/logo.png';
import youtubeLogo from '../../pics/youtube-logo.svg';

import ReactPlayer from 'react-player'
import SecondaryComponent from '../secondary.component'
import ValidMark from '../validMark.component'
import {Context} from '../../store/store';
import MSG from '../message.component'

const DEFAULT_VIDEO_ID = 'FxyQTb6n4_I'
const KARAOKEMP_API = process.env.REACT_APP_KARAOKEMP_API || 'http://localhost:4000'


@observer
export default class SongsSearchComponent extends Component<{}, {
   term: string,
   selectedVideoID: string,
   message:{text:string,theme:MessageTheme},
   suggestions:Song[]|null,
   secondaryComponent: SecondaryComponentMode
  }>{

    static contextType = Context

    constructor(props:any) {
      super(props)
      this.state = {
        term :'',
        message: {text:'',theme:MessageTheme.NOTHING},
        selectedVideoID :DEFAULT_VIDEO_ID,
        suggestions: null,
        secondaryComponent : SecondaryComponentMode.NOTHING    
    }
  }
  
  handleInputChange(change:ChangeEvent<HTMLInputElement> ){
    let value = change.target.value
    this.context!.toggleTheme()

    if(isYoutubePath(value)){
      let link = new YoutubeURL(value)
      let videoId = link.searchParams.get('v') || this.state.selectedVideoID
      this.setState({selectedVideoID:videoId})
      this.setState({message: {text:"Found Youtube Link!",theme:MessageTheme.SUCCESS}})


    }else{
      this.setState({message: {text:'',theme:MessageTheme.NOTHING}})

      
      fetch(`${KARAOKEMP_API}/songs?term=${value}`)
      .then(res => res.json())
      .then((newSuggestions:Song[]) => {
        this.setState({suggestions:newSuggestions})
      }).catch(console.error)

    }
        

  }

  handleRequest(){
    if(this.state.selectedVideoID.length){
      this.sendRequest();
    }else{
      this.setState({message: {text:"Could not send request!",theme:MessageTheme.ERROR}})
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
    this.setState({message: {text:'',theme:MessageTheme.NOTHING}})

}

  render() {
    return(<div className="container">
  <div className="row">
    <div className="col-6 col-lg-6">
  <h1>Welcome to The Karaokemp! </h1>
  <p>Secret: {process.env.REACT_APP_KARAOKEMP_API}</p>
      <div className="text-center"><img className='big' src={karaokempLogo} alt='' style={{height:'100px'}}/></div> <br/><hr/>
        
        <div className='instructions'>Steal Video from &nbsp;<img src={youtubeLogo}alt=''/>
        <input type="text" onChange={this.handleInputChange.bind(this)} style={{ width: "80%" }} placeholder='title, artist, link'/>
        <ValidMark valid={!this.state.message && this.state.term.length >0 }/>

       <MSG message ={this.state.message}/>
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


}